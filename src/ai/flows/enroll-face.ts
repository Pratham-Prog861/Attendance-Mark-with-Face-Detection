// Define the Genkit flow for the EnrollFace story.
'use server';

/**
 * @fileOverview Registers new students by capturing their face data via the webcam and assesses the quality of the image before saving it.
 *
 * - enrollFace - A function that handles the face enrollment process.
 * - EnrollFaceInput - The input type for the enrollFace function.
 * - EnrollFaceOutput - The return type for the enrollFace function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EnrollFaceInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a student's face, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  studentName: z.string().describe('The name of the student to enroll.'),
});
export type EnrollFaceInput = z.infer<typeof EnrollFaceInputSchema>;

const EnrollFaceOutputSchema = z.object({
  success: z.boolean().describe('Whether the face enrollment was successful.'),
  message: z.string().describe('A message indicating the result of the enrollment attempt.'),
});
export type EnrollFaceOutput = z.infer<typeof EnrollFaceOutputSchema>;

export async function enrollFace(input: EnrollFaceInput): Promise<EnrollFaceOutput> {
  return enrollFaceFlow(input);
}

const enrollFacePrompt = ai.definePrompt({
  name: 'enrollFacePrompt',
  input: {schema: EnrollFaceInputSchema},
  output: {schema: EnrollFaceOutputSchema},
  prompt: `You are an AI assistant that helps teachers enroll students by analyzing their facial images.

  Description: The teacher wants to enroll a new student with the name {{{studentName}}}.
  Photo: {{media url=photoDataUri}}

  Analyze the provided image and determine if it's suitable for facial recognition.
  Consider the following criteria:
  - Image Clarity: Is the image clear and in focus?
  - Face Visibility: Is the face fully visible and not obstructed by hair, shadows, or objects?
  - Lighting Conditions: Is the lighting adequate and even?
  - Facial Expression: Is the facial expression neutral?
  - Image Quality: Is the image of sufficient quality (high resolution and no pixelation)?

  Based on your analysis, respond with a JSON object:
  - If the image is suitable, set success to true and provide a positive message.
  - If the image is not suitable, set success to false and provide a message explaining why the image is not suitable and how to improve it.
`,
});

const enrollFaceFlow = ai.defineFlow(
  {
    name: 'enrollFaceFlow',
    inputSchema: EnrollFaceInputSchema,
    outputSchema: EnrollFaceOutputSchema,
  },
  async input => {
    const {output} = await enrollFacePrompt(input);
    return output!;
  }
);
