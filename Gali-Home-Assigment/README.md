# Gali Home Assigment

This is my solution for the home assigment exercise, a Playwright tests written in TypeScript. 

## Prerequisites
1. Ensure you have Playwright installed and set up:\
   `npm install @playwright/test`
2. Create cloudinary user: \
   https://console-staging.cloudinary.com/users/register_free
3. Ensure you have dotenv installed \
   `npm install dotenv`
4. Create .env file at the project root directory and set your-username & your-password \
   USERNAME=your-username \
   PASSWORD=your-password
5. At **GaliHomeAssigment.spec.ts** row 20, set the path of the file on you local computer.

## Test execution
From your project root directory run: `npx playwright test`
