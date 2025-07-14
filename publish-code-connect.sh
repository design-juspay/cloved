#!/bin/bash

# This script helps publish Code Connect to Figma

echo "🚀 Publishing Code Connect to Figma..."
echo ""
echo "Make sure you have:"
echo "1. ✅ Updated the Figma component URL (Done!)"
echo "2. ⚠️  Updated the Storybook URL in figma.config.json (if applicable)"
echo "3. ⚠️  Created a Figma access token"
echo ""
echo "To get a token:"
echo "1. Go to https://www.figma.com/settings"
echo "2. Find 'Personal access tokens'"
echo "3. Create new token named 'Code Connect'"
echo ""
read -p "Do you have your Figma access token? (y/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]
then
    read -p "Enter your Figma access token: " FIGMA_TOKEN
    echo ""
    
    # Export the token
    export FIGMA_ACCESS_TOKEN="$FIGMA_TOKEN"
    
    # Test with dry run first
    echo "📋 Testing with dry run..."
    npx figma connect publish --dry-run
    
    echo ""
    read -p "Did the dry run succeed? Publish for real? (y/n) " -n 1 -r
    echo ""
    
    if [[ $REPLY =~ ^[Yy]$ ]]
    then
        echo "🎉 Publishing to Figma..."
        npx figma connect publish
        echo ""
        echo "✅ Done! Now:"
        echo "1. Open your Figma file"
        echo "2. Switch to Dev Mode (top right toggle)"
        echo "3. Select a ButtonV2 instance"
        echo "4. Check the 'Code' tab - you should see your code!"
    else
        echo "❌ Cancelled. Fix any issues and try again."
    fi
else
    echo "❌ Get your token first from https://www.figma.com/settings"
fi
