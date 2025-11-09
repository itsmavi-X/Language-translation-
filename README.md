# LinguaLens - Modern Language Translation Tool

LinguaLens is a sleek and powerful language translation application built with the latest web technologies. It provides instant, accurate translations between a wide variety of languages, all wrapped in a beautiful and user-friendly interface.

This project was bootstrapped with [Firebase Studio](https://firebase.google.com/studio).

![LinguaLens Screenshot](https://storage.googleapis.com/studioprototyper/projects/e33d9519-491c-43f1-a75d-596924823a31/b73255ca-2292-4910-85f2-959969698d02.png)

## ✨ Features

- **Instant AI Translation**: Get real-time translations powered by Google's Gemini model.
- **Multi-Language Support**: Translate between numerous languages including English, Spanish, French, German, and more.
- **Swap Languages**: Easily switch between source and target languages with a single click.
- **Text-to-Speech**: Listen to the pronunciation of the translated text (browser support required).
- **Copy to Clipboard**: Quickly copy the translated text for use anywhere.
- **Responsive Design**: A seamless experience across desktop and mobile devices.
- **Modern Tech Stack**: Built with Next.js, React, and Tailwind CSS for a fast and modern user experience.

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You need to have Node.js and npm (or yarn) installed on your machine.
- [Node.js](https://nodejs.org/) (which includes npm)

### Installation

1.  **Clone the repo**
    ```sh
    git clone https://github.com/your_username/your_repository.git
    ```
2.  **Navigate to the project directory**
    ```sh
    cd your_repository
    ```
3.  **Install NPM packages**
    ```sh
    npm install
    ```
4. **Set up Environment Variables**

    Create a `.env.local` file in the root of your project and add your Google AI API key. You can get one from [Google AI Studio](https://aistudio.google.com/app/apikey).

    ```
    GEMINI_API_KEY=YOUR_API_KEY
    ```

### Running the Application

1.  **Start the development server**
    ```sh
    npm run dev
    ```
2.  **Open your browser** and navigate to `http://localhost:9002` (or the port specified in your console).

## 🛠️ Built With

This project utilizes a modern and powerful tech stack:

-   [Next.js](https://nextjs.org/) - React framework for production.
-   [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
-   [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework.
-   [ShadCN UI](https://ui.shadcn.com/) - Re-usable components built using Radix UI and Tailwind CSS.
-   [Genkit](https://firebase.google.com/docs/genkit) - An open-source framework to build, deploy, and monitor production-grade AI-powered features.
-   [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript.
-   [Lucide React](https://lucide.dev/) - Beautiful and consistent icons.

---

Happy coding!
