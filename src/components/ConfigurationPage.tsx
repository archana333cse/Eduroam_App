
"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Wifi,
  Settings,
  CheckCircle,
  AlertCircle,
  Copy,
  Terminal,
  Network,
  Download,
} from "lucide-react";

interface ConfigSectionProps {
  title: string;
  children: React.ReactNode;
  id: string;
  icon: React.ComponentType<any>;
}

interface CodeBlockProps {
  code: string;
  label: string;
}

const EduroamUbuntuConfig = () => {
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({});
  const [copiedText, setCopiedText] = useState("");

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(""), 2000);
  };

  const downloadPDF = () => {
    // Download PDF from public folder
    const link = document.createElement('a');
    link.href = '/STEPS_TO_CONFIGURE_ILR.pdf';
    link.download = 'STEPS_TO_CONFIGURE_ILR.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const ConfigSection = ({ title, children, id, icon: Icon }: ConfigSectionProps) => (
    <div className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
      <button
        onClick={() => toggleSection(id)}
        className="w-full px-6 py-4 bg-blue-900 text-white flex items-center justify-between hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
      >
        <div className="flex items-center space-x-3">
          <Icon className="w-5 h-5" />
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        {expandedSections[id] ? (
          <ChevronDown className="w-5 h-5" />
        ) : (
          <ChevronRight className="w-5 h-5" />
        )}
      </button>
      {expandedSections[id] && <div className="p-6 bg-gray-50">{children}</div>}
    </div>
  );

  const CodeBlock: React.FC<CodeBlockProps> = ({ code, label }) => (
    <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm relative mb-4">
      <button
        onClick={() => copyToClipboard(code, label)}
        className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white p-2 rounded transition-colors"
        title="Copy to clipboard"
      >
        <Copy className="w-4 h-4" />
      </button>
      <pre className="whitespace-pre-wrap">{code}</pre>
      {copiedText === label && (
        <div className="absolute top-2 right-12 bg-green-600 text-white px-2 py-1 rounded text-xs">
          Copied!
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Download Button - Top Left */}
        <div className="mb-6">
          <button
            onClick={downloadPDF}
            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-200 font-medium"
          >
            <Download className="w-5 h-5" />
            <span>Download complete Installation Guide</span>
          </button>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-900 p-4 rounded-full">
              <Wifi className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Eduroam Configuration Guide
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Complete guide to configure eduroam wireless network on your Ubuntu
            device
          </p>
        </div>

        {/* Prerequisites */}
        <div className="bg-amber-50 p-6 mb-8 rounded-r-lg">
          <div className="flex items-center mb-3">
            {/* <AlertCircle className="w-6 h-6 text-green-600 mr-2" /> */}
            <h3 className="text-lg font-semibold text-green-800">
              Prerequisites
            </h3>
          </div>
          <ul className="text-green-700 space-y-2">
            <li>• Ubuntu 22.04 or later</li>
            <li>• Valid institutional credentials (username and password)</li>
            <li>• Administrative privileges on your system</li>
            <li>• Active internet connection for initial setup</li>
          </ul>
        </div>

        {/* Method 1: GUI Configuration */}
        <ConfigSection
          title="Method 1: GUI Configuration (Recommended)"
          id="gui"
          icon={Settings}
        >
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                <span className="font-semibold text-green-800">
                  Easiest Method
                </span>
              </div>
              <p className="text-green-700">
                This method uses Ubuntu's built-in network manager GUI.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-800">
                Step-by-step Instructions:
              </h4>

              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-900 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Open Network Settings</p>
                    <p className="text-gray-600">
                      Click on the network icon in the top-right corner and
                      select "Wi-Fi Settings" or go to Settings → Network
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="text-sky-400 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Find and Select eduroam</p>
                    <p className="text-gray-600">
                      Look for "eduroam" in the list of available networks and
                      click on it
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-blue-900 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <div>
                    <p className="font-medium">Configure Network Settings</p>
                    <p className="text-gray-600">
                      Fill in the following details:
                    </p>
                    <div className="mt-2 bg-white p-4 rounded border">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <strong>Security:</strong> WPA & WPA2 Enterprise
                        </div>
                        <div>
                          <strong>Authentication:</strong> Protected EAP (PEAP)
                        </div>
                        <div>
                          <strong>Anonymous Identity:</strong>{" "}
                          anonymous@yourdomain.edu
                        </div>
                        <div>
                          <strong>CA Certificate:</strong> (Leave blank or use
                          system)
                        </div>
                        <div>
                          <strong>PEAP Version:</strong> Automatic
                        </div>
                        <div>
                          <strong>Inner Authentication:</strong> MSCHAPv2
                        </div>
                        <div>
                          <strong>Username:</strong>{" "}
                          your-username@yourdomain.edu
                        </div>
                        <div>
                          <strong>Password:</strong> your-password
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-blue-900 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Connect</p>
                    <p className="text-gray-600">
                      Click "Connect" and wait for the connection to establish
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ConfigSection>

        {/* Method 2: Command Line */}
        <ConfigSection
          title="Method 2: Command Line Configuration"
          id="cli"
          icon={Terminal}
        >
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Terminal className="w-5 h-5 text-sky-400 mr-2" />
                <span className="font-semibold text-sky-400">
                  Advanced Method
                </span>
              </div>
              <p className="text-blue-700">
                For users who prefer command-line configuration or need more
                control.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-800">
                Step 1: Install Required Packages
              </h4>
              <CodeBlock
                code="sudo apt update
sudo apt install network-manager wpasupplicant"
                label="install-packages"
              />

              <h4 className="text-lg font-semibold text-gray-800">
                Step 2: Create Network Configuration
              </h4>
              <p className="text-gray-600">
                Create a configuration file for eduroam:
              </p>
              <CodeBlock
                code="sudo nano /etc/NetworkManager/system-connections/eduroam.nmconnection"
                label="create-config"
              />

              <h4 className="text-lg font-semibold text-gray-800">
                Step 3: Add Configuration Content
              </h4>
              <p className="text-gray-600">
                Add the following content to the file (replace YOUR_DOMAIN,
                username, and password):
              </p>
              <CodeBlock
                code={`[connection]
id=eduroam
type=wifi
autoconnect=true

[wifi]
mode=infrastructure
ssid=eduroam

[wifi-security]
key-mgmt=wpa-eap

[802-1x]
eap=peap;
identity=username@YOUR_DOMAIN
password=your-password
phase2-auth=mschapv2
anonymous-identity=anonymous@YOUR_DOMAIN

[ipv4]
method=auto

[ipv6]
method=auto`}
                label="config-content"
              />

              <h4 className="text-lg font-semibold text-gray-800">
                Step 4: Set Proper Permissions
              </h4>
              <CodeBlock
                code="sudo chmod 600 /etc/NetworkManager/system-connections/eduroam.nmconnection
sudo chown root:root /etc/NetworkManager/system-connections/eduroam.nmconnection"
                label="set-permissions"
              />

              <h4 className="text-lg font-semibold text-gray-800">
                Step 5: Restart Network Manager
              </h4>
              <CodeBlock
                code="sudo systemctl restart NetworkManager"
                label="restart-nm"
              />
            </div>
          </div>
        </ConfigSection>

        {/* Method 3: Using wpa_supplicant */}
        <ConfigSection
          title="Method 3: Using wpa_supplicant"
          id="wpa"
          icon={Network}
        >
          <div className="space-y-6">
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Network className="w-5 h-5 text-purple-600 mr-2" />
                <span className="font-semibold text-purple-800">
                  Manual Configuration
                </span>
              </div>
              <p className="text-purple-700">
                Direct wpa_supplicant configuration for maximum control.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-800">
                Step 1: Create wpa_supplicant Configuration
              </h4>
              <CodeBlock
                code="sudo nano /etc/wpa_supplicant/wpa_supplicant-eduroam.conf"
                label="wpa-config"
              />

              <h4 className="text-lg font-semibold text-gray-800">
                Step 2: Add Network Configuration
              </h4>
              <CodeBlock
                code={`ctrl_interface=/var/run/wpa_supplicant
ctrl_interface_group=netdev
update_config=1

network={
    ssid="eduroam"
    key_mgmt=WPA-EAP
    eap=PEAP
    identity="username@YOUR_DOMAIN"
    password="your-password"
    phase2="auth=MSCHAPV2"
    anonymous_identity="anonymous@YOUR_DOMAIN"
    
    # Optional: Server certificate validation
    # ca_cert="/etc/ssl/certs/ca-certificates.crt"
}`}
                label="wpa-network-config"
              />

              <h4 className="text-lg font-semibold text-gray-800">
                Step 3: Test the Configuration
              </h4>
              <CodeBlock
                code="sudo wpa_supplicant -i wlan0 -c /etc/wpa_supplicant/wpa_supplicant-eduroam.conf"
                label="test-wpa"
              />
            </div>
          </div>
        </ConfigSection>

        {/* Troubleshooting */}
        <ConfigSection
          title="Troubleshooting"
          id="troubleshoot"
          icon={AlertCircle}
        >
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-gray-800">
              Common Issues and Solutions
            </h4>

            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h5 className="font-semibold text-red-800 mb-2">
                  Connection Timeout
                </h5>
                <p className="text-red-700 mb-2">If connection times out:</p>
                <ul className="text-red-600 text-sm space-y-1">
                  <li>
                    • Verify your username includes the domain (@yourdomain.edu)
                  </li>
                  <li>• Check if your password is correct</li>
                  <li>
                    • Try using anonymous identity: anonymous@yourdomain.edu
                  </li>
                </ul>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h5 className="font-semibold text-yellow-800 mb-2">
                  Certificate Issues
                </h5>
                <p className="text-yellow-700 mb-2">
                  If you get certificate errors:
                </p>
                <ul className="text-yellow-600 text-sm space-y-1">
                  <li>• Try leaving CA certificate field blank</li>
                  <li>
                    • Contact your IT department for the correct CA certificate
                  </li>
                  <li>
                    • Disable certificate validation temporarily for testing
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h5 className="font-semibold text-blue-800 mb-2">
                  Check Network Status
                </h5>
                <p className="text-blue-700 mb-2">
                  Commands to diagnose connection:
                </p>
                <CodeBlock
                  code="# Check network interfaces
ip link show

# Check connection status
nmcli connection show

# View system logs
journalctl -u NetworkManager -f"
                  label="diagnostic-commands"
                />
              </div>
            </div>
          </div>
        </ConfigSection>

        {/* Additional Tips */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
          <div className="flex items-center mb-4">
            <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
            <h3 className="text-lg font-semibold text-green-800">Pro Tips</h3>
          </div>
          <ul className="text-green-700 space-y-2">
            <li>
              • <strong>Domain Format:</strong> Always use your full
              institutional domain (e.g., username@university.edu)
            </li>
            <li>
              • <strong>Roaming:</strong> Once configured, eduroam will work at
              participating institutions worldwide
            </li>
            <li>
              • <strong>Security:</strong> eduroam uses enterprise-grade WPA2
              encryption for secure connections
            </li>
            <li>
              • <strong>Support:</strong> Contact your institution's IT help
              desk for credential-specific issues
            </li>
            <li>
              • <strong>Multiple Devices:</strong> You can use the same
              credentials on multiple devices
            </li>
          </ul>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm">
          <p>
            This guide is based on standard eduroam configuration practices.
            Some institutions may have specific requirements.
          </p>
          <p className="mt-2">
            For institution-specific guidance, consult your IT support team.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EduroamUbuntuConfig;