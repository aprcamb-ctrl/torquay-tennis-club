<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/1a1414f6-a0b2-4c58-bcb7-052326ea9673

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure the chat widget (get a free key at https://aistudio.google.com/apikey):
   - Copy `.env.example` to `.env` if you don't have one: `cp .env.example .env`
   - Edit `.env` and replace `YOUR_KEY_HERE` with your Gemini API key
3. Run the app:
   ```bash
   npm run dev
   ```
   **Important:** Restart the dev server after adding your API key.
