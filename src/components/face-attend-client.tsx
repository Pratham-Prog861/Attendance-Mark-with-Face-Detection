"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { enrollFace } from "@/ai/flows/enroll-face";
import { recognizeFace } from "@/ai/flows/recognize-face";
import { useLocalStorage } from "@/hooks/use-local-storage";
import type { EnrolledStudent, AttendanceRecord } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  Camera,
  UserPlus,
  Loader2,
  Video,
  VideoOff,
  ClipboardCheck,
  Users,
  Trash2,
  ArrowLeft,
} from "lucide-react";
import { AppLogo } from "@/components/icons";
import { ScrollArea } from "./ui/scroll-area";

const recognitionInterval = 2000; // ms

export function FaceAttendClient() {
  const [enrolledStudents, setEnrolledStudents] = useLocalStorage<
    EnrolledStudent[]
  >("enrolled-students", []);
  const [attendance, setAttendance] = useLocalStorage<AttendanceRecord[]>(
    "attendance-records",
    []
  );

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isWebcamOn, setIsWebcamOn] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState("Initializing...");
  const [isEnrollDialogOpen, setIsEnrollDialogOpen] = useState(false);
  const recognitionIntervalRef = useRef<NodeJS.Timeout>();

  const { toast } = useToast();

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setIsWebcamOn(true);
        setStatusMessage("Webcam active. Point your face to the camera.");
      }
    } catch (error) {
      console.error("Error accessing webcam:", error);
      setStatusMessage("Could not access webcam.");
      toast({
        variant: "destructive",
        title: "Webcam Error",
        description:
          "Could not access webcam. Please check permissions and refresh.",
      });
    }
  };

  const stopWebcam = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setIsWebcamOn(false);
      setStatusMessage("Webcam off.");
    }
  };

  const captureFrame = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return null;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext("2d");
    if (!context) return null;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg");
  }, []);

  const handleRecognizeFace = useCallback(async () => {
    if (isProcessing || !enrolledStudents.length) {
      if (!enrolledStudents.length) {
        setStatusMessage("No students enrolled. Please register students.");
      }
      return;
    }

    setIsProcessing(true);
    setStatusMessage("Detecting face...");
    const photoDataUri = captureFrame();

    if (!photoDataUri) {
      setIsProcessing(false);
      return;
    }

    try {
      const result = await recognizeFace({ photoDataUri, enrolledStudents });
      if (result.name && result.name !== "Unknown") {
        const now = new Date();
        const alreadyMarked = attendance.some(
          (record) =>
            record.name === result.name &&
            new Date(record.timestamp).toDateString() === now.toDateString()
        );
        if (!alreadyMarked) {
          const newRecord: AttendanceRecord = {
            name: result.name,
            timestamp: now.toISOString(),
          };
          setAttendance((prev) => [newRecord, ...prev]);
          setStatusMessage(`Welcome, ${result.name}! Attendance marked.`);
          toast({
            title: "Attendance Marked",
            description: `${result.name} marked present at ${now.toLocaleTimeString()}`,
          });
        } else {
          setStatusMessage(`Hi ${result.name}, you are already marked present.`);
        }
      } else {
        setStatusMessage("Face not recognized. Please try again.");
      }
    } catch (error) {
      console.error("Recognition error:", error);
      setStatusMessage("An error occurred during recognition.");
    } finally {
      setIsProcessing(false);
    }
  }, [
    isProcessing,
    captureFrame,
    enrolledStudents,
    attendance,
    setAttendance,
    toast,
  ]);

  useEffect(() => {
    if (isWebcamOn && enrolledStudents.length > 0) {
      recognitionIntervalRef.current = setInterval(
        handleRecognizeFace,
        recognitionInterval
      );
    } else {
      if (recognitionIntervalRef.current) {
        clearInterval(recognitionIntervalRef.current);
      }
    }

    return () => {
      if (recognitionIntervalRef.current) {
        clearInterval(recognitionIntervalRef.current);
      }
    };
  }, [isWebcamOn, enrolledStudents.length, handleRecognizeFace]);

  useEffect(() => {
    return () => stopWebcam(); // Cleanup on unmount
  }, []);

  const handleEnroll = (newStudent: EnrolledStudent) => {
    setEnrolledStudents((prev) => [...prev, newStudent]);
    setIsEnrollDialogOpen(false);
    toast({
      title: "Enrollment Successful",
      description: `${newStudent.name} has been enrolled.`,
    });
  };

  const handleDeleteStudent = (studentNameToDelete: string) => {
    setEnrolledStudents((prev) =>
      prev.filter((student) => student.name !== studentNameToDelete)
    );
    toast({
      title: "Student Deleted",
      description: `${studentNameToDelete} has been removed.`,
    });
  };

  const clearAttendance = () => {
    setAttendance([]);
    toast({
      title: "Attendance Cleared",
      description: "All attendance records have been removed.",
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans">
      {/* Improved Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild className="hover:bg-primary/10">
            <Link href="/">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            <AppLogo className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
              FaceAttend
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={() => (isWebcamOn ? stopWebcam() : startWebcam())}
            variant={isWebcamOn ? "destructive" : "default"}
            className="w-40 transition-all"
          >
            {isWebcamOn ? (
              <VideoOff className="mr-2 h-4 w-4" />
            ) : (
              <Video className="mr-2 h-4 w-4" />
            )}
            {isWebcamOn ? "Stop Webcam" : "Start Webcam"}
          </Button>
          <Dialog open={isEnrollDialogOpen} onOpenChange={setIsEnrollDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-40">
                <UserPlus className="mr-2 h-4 w-4" />
                Register Student
              </Button>
            </DialogTrigger>
            <EnrollStudentDialog
              onEnroll={handleEnroll}
              captureFrame={captureFrame}
              isWebcamOn={isWebcamOn}
            />
          </Dialog>
        </div>
      </header>

      {/* Improved Main Content */}
      <main className="flex-grow p-6 md:p-8 max-w-7xl mx-auto w-full">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <Card className="overflow-hidden shadow-lg border-primary/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl font-semibold">
                  <Camera className="h-5 w-5 text-primary" />
                  Webcam Feed
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  Position your face clearly in the frame for recognition.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative w-full aspect-video bg-muted rounded-lg overflow-hidden">
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    playsInline
                    autoPlay
                    muted
                  />
                  {!isWebcamOn && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground bg-background/90 backdrop-blur-sm">
                      <Camera size={48} className="mb-4 text-primary" />
                      <p className="font-medium">Webcam is off</p>
                      <p className="text-sm opacity-70">Click 'Start Webcam' to begin</p>
                    </div>
                  )}
                  <canvas ref={canvasRef} className="hidden" />
                </div>
              </CardContent>
              <CardFooter className="bg-muted/50 border-t p-4">
                <div className="flex items-center w-full">
                  {isProcessing && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin text-primary" />
                  )}
                  <p className="text-sm font-medium text-muted-foreground">
                    {statusMessage}
                  </p>
                </div>
              </CardFooter>
            </Card>
          </div>

          {/* Improved Sidebar */}
          <div className="md:col-span-1 space-y-6">
            <AttendanceList records={attendance} onClear={clearAttendance} />
            <EnrolledStudentsList
              students={enrolledStudents}
              onDelete={handleDeleteStudent}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

function EnrollStudentDialog({
  onEnroll,
  captureFrame,
  isWebcamOn,
}: {
  onEnroll: (newStudent: EnrolledStudent) => void;
  captureFrame: () => string | null;
  isWebcamOn: boolean;
}) {
  const [studentName, setStudentName] = useState("");
  const [isEnrolling, setIsEnrolling] = useState(false);
  const { toast } = useToast();

  const handleEnrollClick = async () => {
    if (!studentName.trim()) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please enter a student name.",
      });
      return;
    }

    const photoDataUri = captureFrame();
    if (!photoDataUri) {
      toast({
        variant: "destructive",
        title: "Capture Error",
        description:
          "Could not capture image. Please ensure the webcam is on.",
      });
      return;
    }

    setIsEnrolling(true);
    try {
      const result = await enrollFace({ photoDataUri, studentName });
      if (result.success) {
        onEnroll({ name: studentName, faceDataUri: photoDataUri });
        setStudentName("");
      } else {
        toast({
          variant: "destructive",
          title: "Enrollment Failed",
          description: result.message,
        });
      }
    } catch (error) {
      console.error("Enrollment error:", error);
      toast({
        variant: "destructive",
        title: "Enrollment Error",
        description: "An unexpected error occurred.",
      });
    } finally {
      setIsEnrolling(false);
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Register New Student</DialogTitle>
        <DialogDescription>
          Enter the student's name and capture a clear photo of their face from
          the webcam feed.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid items-center grid-cols-4 gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input
            id="name"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            className="col-span-3"
            placeholder="e.g. Jane Doe"
          />
        </div>
      </div>
      <DialogFooter>
        <Button
          onClick={handleEnrollClick}
          disabled={isEnrolling || !studentName || !isWebcamOn}
        >
          {isEnrolling ? (
            <Loader2 />
          ) : (
            <Camera />
          )}
          {isEnrolling ? "Enrolling..." : "Capture & Enroll"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}

function AttendanceList({
  records,
  onClear,
}: {
  records: AttendanceRecord[];
  onClear: () => void;
}) {
  return (
    <Card className="shadow-lg border-primary/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <ClipboardCheck className="h-5 w-5 text-primary" />
            Today's Attendance
          </CardTitle>
          {records.length > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClear}
              className="hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          {records.length > 0 ? (
            <ul className="space-y-2">
              {records.map((record) => (
                <li
                  key={record.timestamp}
                  className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-colors"
                >
                  <span className="font-medium text-foreground">
                    {record.name}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {new Date(record.timestamp).toLocaleTimeString()}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground py-10">
              <ClipboardCheck className="h-8 w-8 mb-4 text-primary/40" />
              <p className="font-medium">No attendance records yet</p>
              <p className="text-sm opacity-70">Records will appear here when students are marked present</p>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

function EnrolledStudentsList({
  students,
  onDelete,
}: {
  students: EnrolledStudent[];
  onDelete: (name: string) => void;
}) {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Users />
          Enrolled Students
        </CardTitle>
        <CardDescription>
          Manage the list of registered students.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-40">
          {students.length > 0 ? (
            <ul className="space-y-2">
              {students.map((student, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between gap-3 group p-2 rounded-md hover:bg-muted"
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={student.faceDataUri}
                      alt={student.name}
                      width={40}
                      height={40}
                      className="rounded-full object-cover aspect-square"
                    />
                    <span className="font-medium">{student.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => onDelete(student.name)}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                    <span className="sr-only">Delete {student.name}</span>
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center text-muted-foreground py-10">
              <p>No students enrolled yet.</p>
              <p className="text-sm">Click 'Register Student' to begin.</p>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
