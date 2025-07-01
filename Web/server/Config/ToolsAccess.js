const toolAccessByRole = {
  admin: [
    "AutoSOC",
    "AutoCom",
    "Phantom Radar",
    "CyberKnowledge Engine Agent",
    "AutoRed",
    "ZeroCodeSec",
    "GhostIntel",
    "Real-Time Radar",
  ],
  moderator: [
    "AutoSOC",
    "AutoCom",
    "Phantom Radar",
    "Real-Time Radar",
  ],
  client: [
    "Phantom Radar",
    "Real-Time Radar",
  ],
  member: [
    "AutoSOC",
    "AutoCom",
    "Real-Time Radar",
  ],
  CISO: [
    "CyberKnowledge Engine Agent",
    "Phantom Radar",
    "GhostIntel",
    "Real-Time Radar",
  ],
  User: [
    "AutoSOC",
    "AutoCom",
  ],
  Manager: [
    "AutoSOC",
    "Phantom Radar",
    "Real-Time Radar",
    "GhostIntel",
  ],
  Auditor: [
    "CyberKnowledge Engine Agent",
    "ZeroCodeSec",
    "GhostIntel",
    "Real-Time Radar",
  ],
  SOCAnalyst: [
    "AutoSOC",
    "AutoRed",
    "Phantom Radar",
    "Real-Time Radar",
  ],
};

module.exports = toolAccessByRole