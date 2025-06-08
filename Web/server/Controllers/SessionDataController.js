const ToolsSession = require("../Models/SessionDataModel");


exports. StoreSessionData = async(req,res)=>{
    try {
        const SessionData = new ToolsSession(req.body)
        await SessionData.save()
        res.send(SessionData)
    } catch (error) {
        console.log(error);
    }
}

exports.GetSessionData = async (req, res) => {
  try {
    console.log(req.query);
    
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: "Session ID is required" });
    }

    const sessionData = await ToolsSession.findById(id);

    if (!sessionData) {
      return res.status(404).json({ error: "Session not found" });
    }

    res.status(200).json(sessionData);
  } catch (error) {
    console.error("GetSessionData error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


exports.DeleteSessionData = async (req, res) => {
  try {
    console.log(req.query);
    
    const { id } = req.query;
    console.log(id);
    
    if (!id) {
      return res.status(400).json({ error: "Session ID is required" });
    }
    const deletedData = await ToolsSession.findByIdAndDelete(id);

    if (!deletedData) {
      return res.status(404).json({ error: "Session not found" });
    }

    res.status(200).json({ success: true, deleted: deletedData });
  } catch (error) {
    console.error("DeleteSessionData error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
