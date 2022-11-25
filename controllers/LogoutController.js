

const logout = async (req,res) => {
    return res.status(200).json({
        "status": true,
        "message": "User logged out successfully."
    })
}

module.exports = {
    logout
}