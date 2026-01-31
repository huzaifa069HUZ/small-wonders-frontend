const nodemailer = require('nodemailer');

const allowCors = fn => async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    if (req.method === 'OPTIONS') {
        res.status(200).end()
        return
    }
    return await fn(req, res)
}

const handler = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        const {
            fullName,
            classApplying,
            message
        } = req.body;

        if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
            throw new Error('Server misconfiguration: Missing email credentials.');
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS
            }
        });

        const mailOptions = {
            from: `"SWSK Contact" <${process.env.GMAIL_USER}>`,
            to: `${process.env.SCHOOL_EMAIL}, ${process.env.GMAIL_USER}`,
            subject: `💬 New Contact Form Submission - ${fullName}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa; border-radius: 10px;">
                    <div style="background: linear-gradient(135deg, #0A2540 0%, #00D1FF 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
                        <h1 style="color: white; margin: 0; font-size: 24px;">Small Wonders Kids School</h1>
                        <p style="color: #FFD700; margin: 10px 0 0 0; font-size: 14px; font-weight: bold;">NEW CONTACT MESSAGE</p>
                    </div>
                    
                    <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <h2 style="color: #0A2540; border-bottom: 3px solid #00D1FF; padding-bottom: 10px; margin-top: 0;">Contact Information</h2>
                        <table style="width: 100%; margin-bottom: 25px;">
                            <tr>
                                <td style="padding: 8px 0; color: #666; font-weight: bold; width: 40%;">Name:</td>
                                <td style="padding: 8px 0; color: #0A2540; font-weight: bold;">${fullName}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; color: #666; font-weight: bold;">Class Interest:</td>
                                <td style="padding: 8px 0; color: #0A2540; background: #00D1FF20; padding: 5px 10px; border-radius: 5px; display: inline-block;"><strong>${classApplying}</strong></td>
                            </tr>
                        </table>

                        <h2 style="color: #0A2540; border-bottom: 3px solid #FFD700; padding-bottom: 10px;">Message</h2>
                        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #00D1FF; margin-bottom: 25px;">
                            <p style="color: #0A2540; margin: 0; line-height: 1.6;">${message || 'No message provided'}</p>
                        </div>

                        <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #f0f0f0; text-align: center;">
                            <p style="color: #999; font-size: 12px; margin: 0;">
                                📅 Submitted on ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} (IST)<br>
                                🌐 Via Small Wonders Kids School Website - Contact Form
                            </p>
                        </div>
                    </div>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({
            success: true,
            message: 'Message sent successfully! We will contact you soon.'
        });

    } catch (error) {
        console.error('❌ Error sending contact email:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send message. Please try again or call us directly.'
        });
    }
}

module.exports = allowCors(handler);
