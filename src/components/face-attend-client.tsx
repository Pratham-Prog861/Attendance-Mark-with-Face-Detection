"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
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
} from "lucide-react";
import { AppLogo } from "@/components/icons";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";

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
      if (result.name) {
        const now = new Date();
        const alreadyMarked = attendance.some(
          (record) => record.name === result.name
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
  }, [isWebcamOn, enrolledStudents, handleRecognizeFace]);

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

  return (
    <div className="flex flex-col min-h-screen bg-background font-body">
      <header className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
          <AppLogo className="w-8 h-8 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight text-foreground font-headline">
            FaceAttend
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={isWebcamOn ? "destructive" : "default"}
            onClick={() => (isWebcamOn ? stopWebcam() : startWebcam())}
          >
            {isWebcamOn ? (
              <VideoOff className="mr-2" />
            ) : (
              <Video className="mr-2" />
            )}
            {isWebcamOn ? "Stop Webcam" : "Start Webcam"}
          </Button>
          <Dialog open={isEnrollDialogOpen} onOpenChange={setIsEnrollDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <UserPlus className="mr-2" />
                Register Student
              </Button>
            </DialogTrigger>
            <EnrollStudentDialog
              onEnroll={handleEnroll}
              captureFrame={captureFrame}
            />
          </Dialog>
        </div>
      </header>

      <main className="flex-grow p-4 md:p-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera />
                  Webcam Feed
                </CardTitle>
                <CardDescription>
                  Position your face clearly in the frame for recognition.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative w-full aspect-video bg-muted rounded-md overflow-hidden flex items-center justify-center shadow-inner">
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    playsInline
                  />
                  {!isWebcamOn && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground bg-black/50">
                      <Camera size={48} className="mb-4" />
                      <p>Webcam is off</p>
                    </div>
                  )}
                  <canvas ref={canvasRef} className="hidden" />
                </div>
              </CardContent>
              <CardFooter className="bg-muted/50 p-4">
                <div className="flex items-center w-full">
                  {isProcessing && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  <p className="text-sm text-muted-foreground">
                    {statusMessage}
                  </p>
                </div>
              </CardFooter>
            </Card>
          </div>
          <div className="md:col-span-1">
            <AttendanceList records={attendance} />
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
}: {
  onEnroll: (newStudent: EnrolledStudent) => void;
  captureFrame: () => string | null;
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
        description: "Could not capture image from webcam.",
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
          Enter the student's name and capture a clear photo of their face.
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
          disabled={isEnrolling || !studentName}
        >
          {isEnrolling ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Camera className="mr-2" />
          )}
          {isEnrolling ? "Enrolling..." : "Capture & Enroll"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}

function AttendanceList({ records }: { records: AttendanceRecord[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ClipboardCheck />
          Attendance
        </CardTitle>
        <CardDescription>
          Students who have been marked present today.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-48">
          {records.length > 0 ? (
            <ul className="space-y-3">
              {records.map((record) => (
                <li
                  key={record.timestamp}
                  className="flex items-center justify-between"
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
            <div className="text-center text-muted-foreground py-10">
              <p>No students marked present yet.</p>
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
  if (students.length === 0) return null;

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users />
          Enrolled Students
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-40">
          <ul className="space-y-2">
            {students.map((student, index) => (
              <li
                key={index}
                className="flex items-center justify-between gap-3 group"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={student.faceDataUri}
                    alt={student.name}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                  <span className="font-medium">{student.name}</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 opacity-0 group-hover:opacity-100"
                  onClick={() => onDelete(student.name)}
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                  <span className="sr-only">Delete {student.name}</span>
                </Button>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
