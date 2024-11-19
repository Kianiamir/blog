---
title: "Optimizing Shadowrocket - Bypass Proxy for Specific Domains and Apps"
date: 2024-06-01
draft: false
categories: ["Tech Tutorials"]
tags: ["Shadowrocket", "App Settings", "Technical Guide", "Optimization"]
---
### How to Make Shadowrocket Bypass Proxy for Specific Domains and Apps

Shadowrocket is a powerful tool that allows you to manage network traffic on your macOS device efficiently. One of its key features is the ability to set up rules that dictate how traffic is handled for specific domains and applications. In this guide, we'll walk you through the process of bypassing the proxy for specific domains and apps, using the ChatGPT app and OpenAI-related traffic as examples.

#### Understanding Shadowrocket Rules

Shadowrocket uses rules to determine how traffic is routed. These rules can be configured to handle different types of traffic in various ways. Understanding the different rule types and how to use them effectively is crucial for managing your network traffic:

- **DOMAIN**: Matches an exact domain name. Use this rule when you want to target a specific domain without affecting its subdomains. For instance, setting a rule for `example.com` will not apply to `sub.example.com`.

- **DOMAIN-SUFFIX**: Matches any domain that ends with the specified suffix. This is useful for applying rules to an entire domain and all its subdomains. For example, `DOMAIN-SUFFIX,example.com` will match `example.com`, `sub.example.com`, and any other subdomains.

- **DOMAIN-KEYWORD**: Matches any domain that contains the specified keyword. This is a more flexible rule that can capture multiple domains containing the keyword, regardless of their exact structure.

- **GEOIP**: Matches traffic based on geographic location. This rule can be used to route traffic from specific countries through the proxy.

#### Practical Examples

1. **DOMAIN**:
   - **Rule**: `DOMAIN,openai.com,DIRECT`
   - **Applies to**: `openai.com`
   - **Does not apply to**: `api.openai.com`, `sub.openai.com`

2. **DOMAIN-SUFFIX**:
   - **Rule**: `DOMAIN-SUFFIX,openai.com,PROXY`
   - **Applies to**: `openai.com`, `api.openai.com`, `sub.openai.com`
   - **Does not apply to**: `openai.com.au`, `openai.org`

3. **DOMAIN-KEYWORD**:
   - **Rule**: `DOMAIN-KEYWORD,openai,DIRECT`
   - **Applies to**: `openai.com`, `api.openai.com`, `openai.org`, `anotheropenai.net`
   - **Does not apply to**: `open-ai.com`, `example.com`

Understanding and utilizing these rules effectively allows you to optimize your network performance, enhance security, and ensure that specific types of traffic are handled according to your requirements.

### Option 1: Setting Rules for Specific Apps (ChatGPT Launcher in My Case)

To set a rule for an app and not a website in Shadowrocket on macOS, you’ll need to use the application’s bundle identifier or process name to target the specific app traffic. Shadowrocket allows you to configure rules that apply to specific apps, bypassing or directing their traffic through the proxy as desired. Here’s how you can do it:

#### Step-by-Step Guide

1. **Find the App’s Bundle Identifier**:
   - Open the Terminal app on your Mac.
   - Use the following command to find the bundle identifier of the app (replace `AppName` with the actual name of the app):
     ```sh
     osascript -e 'id of app "AppName"'
     ```
   - For example, to find the bundle identifier of the ChatGPT app, you would use:
     ```sh
     osascript -e 'id of app "ChatGPT"'
     ```

2. **Configure Rules for the App**:
   - Go to the rules section in Shadowrocket. This might be under a tab labeled "Rules" or "Configuration."
   - Add a new rule to apply the custom proxy settings to the app using its bundle identifier.

     Since the bundle identifier for the ChatGPT app includes the keyword `openai` (e.g., `com.openai.chat`), the `DOMAIN-KEYWORD` rule for `openai` will route the traffic for the app directly as well.

### Option 2: Bypassing Proxy for ChatGPT and All OpenAI Traffic Across Browsers, Plugins, Apps, and APIs

To bypass the proxy for the ChatGPT app and all OpenAI-related traffic on macOS, follow these steps:

1. **Open Shadowrocket**:
   - Launch the Shadowrocket application on your Mac.

2. **Access the Rules Section**:
   - Navigate to the rules section. This might be under a tab labeled "Rules" or "Configuration."

3. **Add a Domain-Keyword Rule**:
   - In the rules section, add a new rule using the `DOMAIN-KEYWORD` type.
   - Enter the keyword `openai` and set the action to `DIRECT`. This ensures that any traffic containing the keyword `openai` will bypass the proxy.

4. **Save and Apply the Rule**:
   - Save the configuration and make