# **App Name**: FaceAttend

## Core Features:

- Webcam Access: Access user's webcam to capture real-time video stream for facial recognition.
- Face Recognition: Detect faces from the webcam stream, compare against enrolled faces, and output a name.
- Name Display: Display the student's name once the face is recognized.
- Attendance Marking: Mark attendance with student's name and timestamp, preventing duplicate entries for the same session using browser local storage.
- Attendance List: List students marked as present with the time of attendance.
- Student Registration: Tool for adding new students to the facial recognition tool; the tool can determine the quality of the image used, to prevent failures. Images of enrolled faces are stored locally within the user's browser.
- Local Storage: Store student face data and attendance records locally in the browser to eliminate the need for a backend database.

## Style Guidelines:

- Primary color: Slate blue (#708090) to convey trustworthiness and reliability, aligning with the secure nature of facial recognition attendance.
- Background color: Light gray (#D3D3D3) for a neutral, clean interface that reduces eye strain during extended use.
- Accent color: Sky blue (#87CEEB) to highlight interactive elements like the attendance button and student registration.
- Body and headline font: 'PT Sans', a humanist sans-serif that combines a modern look and a little warmth, is appropriate for headlines or body text.
- Use simple, flat icons for key functions such as 'Register,' 'Attendance,' and 'Webcam.'
- Implement a responsive design that adapts to different screen sizes, ensuring accessibility on desktops, tablets, and smartphones.
- Incorporate subtle animations, such as a loading indicator during face detection, to enhance the user experience.