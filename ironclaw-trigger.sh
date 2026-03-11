#!/bin/bash
# Ironclaw Auto-Blogger Scheduled Task
# Set up full environment PATHs because Cron runs in an empty context
export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"
# Load environment variables
if [ -f .env ]; then
  source .env
fi
export GEMINI_API_KEY

# Move into the server root
cd "/Users/bdlt/QuickAccutrateBooks" || exit

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
    /opt/homebrew/bin/firebase deploy --only hosting >> ironclaw-cron.log 2>&1
    
    echo "[=== Finished Ironclaw Execution: $(date) ===]" >> ironclaw-cron.log
else
    echo "ERROR: Ironclaw failed to run." >> ironclaw-cron.log
fi
