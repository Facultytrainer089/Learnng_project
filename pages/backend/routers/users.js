```javascript
// backend/routes/users.js

const express = require("express");
const pool = require("../database");

const router = express.Router();


// ==========================================
// GET ALL USERS
// ==========================================

router.get("/", async (req, res) => {

    try {

        const result = await pool.query(
            `SELECT id, name, email, role, created_at
             FROM users
             ORDER BY id DESC`
        );

        res.json({
            success: true,
            users: result.rows
        });

    } catch (error) {

        console.error("Get users error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to get users"
        });

    }

});


// ==========================================
// GET USER BY ID
// ==========================================

router.get("/:id", async (req, res) => {

    try {

        const { id } = req.params;

        const result = await pool.query(
            `SELECT id, name, email, role, created_at
             FROM users
             WHERE id = $1`,
            [id]
        );

        if (result.rows.length === 0) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            });

        }

        res.json({
            success: true,
            user: result.rows[0]
        });

    } catch (error) {

        console.error("Get user error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to get user"
        });

    }

});


// ==========================================
// UPDATE USER
// ==========================================

router.put("/:id", async (req, res) => {

    try {

        const { id } = req.params;

        const {
            name,
            email,
            role
        } = req.body;


        if (!name || !email || !role) {

            return res.status(400).json({
                success: false,
                message: "Name, email and role are required"
            });

        }


        const result = await pool.query(

            `UPDATE users
             SET name = $1,
                 email = $2,
                 role = $3
             WHERE id = $4
             RETURNING id, name, email, role, created_at`,

            [
                name,
                email,
                role,
                id
            ]

        );


        if (result.rows.length === 0) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            });

        }


        res.json({

            success: true,

            message: "User updated successfully",

            user: result.rows[0]

        });

    } catch (error) {

        console.error("Update user error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to update user"
        });

    }

});


// ==========================================
// DELETE USER
// ==========================================

router.delete("/:id", async (req, res) => {

    try {

        const { id } = req.params;


        const result = await pool.query(

            `DELETE FROM users
             WHERE id = $1
             RETURNING id, name, email`,

            [id]

        );


        if (result.rows.length === 0) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            });

        }


        res.json({

            success: true,

            message: "User deleted successfully",

            user: result.rows[0]

        });

    } catch (error) {

        console.error("Delete user error:", error);

        res.status(500).json({

            success: false,

            message: "Unable to delete user"

        });

    }

});


module.exports = router;
