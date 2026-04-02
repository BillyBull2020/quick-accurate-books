#!/bin/bash
# Ironclaw Auto-Blogger Scheduled Task
# Set up full environment PATHs because Cron runs in an empty context
export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"

# Move into the server root
cd "/Users/bdlt/BioD2026/QuickAccutrateBooks" || exit

# Load environment variables
if [ -f .env ]; then
  # Load .env while avoiding issues with export
  export $(grep -v '^#' .env | xargs)
fi

# Ensure GEMINI_API_KEY is available
if [ -z "$GEMINI_API_KEY" ]; then
    echo "ERROR: GEMINI_API_KEY not found in .env" >> ironclaw-cron.log
    exit 1
fi

echo "[=== Starting Ironclaw Execution: $(date) ===]" >> ironclaw-cron.log

# 1. Run the AI generator
/opt/homebrew/bin/node ironclaw.js >> ironclaw-cron.log 2>&1

if [ $? -eq 0 ]; then
    echo "Ironclaw completed successfully. Pushing to GitHub and Firebase..." >> ironclaw-cron.log
    
    # 2. Push code to the cloud repository to save changes
    git add .
    git commit -m "Automated SEO Blog update via Ironclaw Ghost Protocol"
    git push origin master >> ironclaw-cron.log 2>&1
    
    # 3. Deploy new code directly to the live Firebase website
    # Try to find firebase binary
    FIREBASE_BIN=$(which firebase)
    if [ -z "$FIREBASE_BIN" ]; then
        FIREBASE_BIN="/opt/homebrew/bin/firebase"
    fi
    
    $FIREBASE_BIN deploy --only hosting >> ironclaw-cron.log 2>&1
    
    echo "[=== Finished Ironclaw Execution: $(date) ===]" >> ironclaw-cron.log
else
    echo "ERROR: Ironclaw failed to run." >> ironclaw-cron.log
fi

