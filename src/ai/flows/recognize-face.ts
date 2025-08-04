// src/ai/flows/recognize-face.ts
'use server';
/**
 * @fileOverview An AI agent for recognizing faces from a webcam stream.
 *
 * - recognizeFace - A function that handles the face recognition process.
 * - RecognizeFaceInput - The input type for the recognizeFace function.
 * - RecognizeFaceOutput - The return type for the recognizeFace function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecognizeFaceInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a face, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  enrolledStudents: z
    .array(z.object({name: z.string(), faceDataUri: z.string()}))
    .describe('An array of enrolled faces with names and face data URIs.'),
});
export type RecognizeFaceInput = z.infer<typeof RecognizeFaceInputSchema>;

const RecognizeFaceOutputSchema = z.object({
  name: z.string().describe('The name of the recognized person, or "Unknown" if not recognized.'),
});
export type RecognizeFaceOutput = z.infer<typeof RecognizeFaceOutputSchema>;

export async function recognizeFace(input: RecognizeFaceInput): Promise<RecognizeFaceOutput> {
  return recognizeFaceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recognizeFacePrompt',
  input: {schema: RecognizeFaceInputSchema},
  output: {schema: RecognizeFaceOutputSchema},
  prompt: `You are an expert in facial recognition.

You are given a photo of a face and a list of enrolled faces.
Your goal is to determine if the face in the photo matches any of the enrolled faces.

Here is the photo of the face to recognize:
{{media url=photoDataUri}}

Here is the list of enrolled faces:
{{#each enrolledStudents}}
- Name: {{this.name}}, Face: {{media url=this.faceDataUri}}
{{/each}}

If the face is recognized, return the name of the person. If the face is not recognized, return "Unknown".
`,
});

const recognizeFaceFlow = ai.defineFlow(
  {
    name: 'recognizeFaceFlow',
    inputSchema: RecognizeFaceInputSchema,
    outputSchema: RecognizeFaceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
