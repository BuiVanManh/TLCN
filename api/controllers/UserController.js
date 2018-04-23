const UserModel = require('../models/UserModel');
const jwt = require('jsonwebtoken');

const config = require('../config/db');
const Custompassword = require('../Helper/Custompassword');

const nodemailer = require('nodemailer');

email = process.env.MAILER_EMAIL_ID || 'phamvuhoangtuan1604@gmail.com',
    pass = process.env.MAILER_PASSWORD || 'phamvuhoangtuan';

const client = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: email, // Your email address
        pass: pass // Your password
    },
    tls: { rejectUnauthorized: false }
});

const register = function (req, res) {
    if (!req.body.email) {
        res.json({ success: false, message: 'cần phải nhập vào e-mail' });
    } else {
        if (!req.body.password) {
            res.json({ success: false, message: 'cần phải nhập vào password' });
        } else {
            if (!req.body.username) {
                res.json({ success: false, message: 'cần phải nhập vào tên người dùng' });
            } else {
                let user = new UserModel({
                    email: req.body.email.toLowerCase(),
                    username: req.body.username,
                    password: req.body.password,
                    dateOfBirth: req.body.dateOfBirth,
                    sex: req.body.sex,
                    address: req.body.address,
                    phone: req.body.phone
                });
                user.save(function (err) {
                    if (err) {
                        if (err.code === 11000) {
                            res.json({ success: false, message: 'Email đã được đăng ký.' });
                        } else {
                            if (err.errors) {
                                if (err.errors.email) {
                                    res.json({ success: false, message: err.errors.email.message });
                                } else {
                                    if (err.errors.password) {
                                        res.json({ success: false, message: err.errors.password.message });
                                    } else {
                                        res.json({ success: false, message: err });
                                    }
                                }
                            } else {
                                res.json({ success: false, message: 'đăng ký thất bại, lỗi: ', err });
                            }
                        }
                    } else {
                        res.json({ success: true, message: 'Đăng ký thành công !' });
                    }
                });
            }
        }
    }
}

const registerWithMail = function (req, res) {
    if (!req.body.email) {
        res.json({ success: false, message: 'cần phải nhập vào e-mail' });
    } else {
        if (!req.body.username) {
            res.json({ success: false, message: 'cần phải nhập vào tên người dùng' });
        } else {
            if (!req.body.phone) {
                res.json({ success: false, message: 'cần phải nhập vào số điện thoại' });
            } else {
                var password = Custompassword.generatorPass();
                let user = new UserModel({
                    email: req.body.email.toLowerCase(),
                    username: req.body.username,
                    phone: req.body.phone,
                    password: password
                });
                user.save(function (err) {
                    if (err) {
                        if (err.code === 11000) {
                            res.json({ success: false, message: 'Email đã được đăng ký.' });
                        } else {
                            if (err.errors) {
                                if (err.errors.email) {
                                    res.json({ success: false, message: err.errors.email.message });
                                } else {
                                    if (err.errors.password) {
                                        res.json({ success: false, message: err.errors.password.message });
                                    } else {
                                        res.json({ success: false, message: err });
                                    }
                                }
                            } else {
                                res.json({ success: false, message: 'đăng ký thất bại, lỗi: ', err });
                            }
                        }
                    } else {
                        // Create e-mail object to send to user
                        var email = {
                            from: 'Admin TSM Group',
                            to: [user.email],
                            subject: 'Phát sinh Password',
                            text: 'Chào bạn: ' + user.username + ', Mật khẩu của bạn là : ' + password
                            // html: 'Hello<strong> </strong>,<br><br>Thank you for registering at localhost.com. Please click on the link below to complete your activation:<br><br><a href="http://www.herokutestapp3z24.com/activate/">http://www.herokutestapp3z24.com/activate/</a>'
                        };
                        // Function to send e-mail to the user
                        client.sendMail(email, function (err, info) {
                            if (err) {
                                console.log(err); // If error with sending e-mail, log to console/terminal
                                res.json({ success: false, message: 'Kiểm tra lại kết nối mạng ', err });
                            } else {
                                console.log(info); // Log success message to console if sent
                                console.log(user.email); // Display e-mail that it was sent to
                            }
                        });
                        res.json({ success: true, message: 'Đăng ký thành công !, Vui lòng check mail để nhận mật khẩu' });
                        return;
                    }
                });
            }
        }
    }
}

const login = function (req, res) {
    if (!req.body.email) {
        res.json({ success: false, message: 'Bạn chưa nhập email' });
    } else {
        if (!req.body.password) {
            res.json({ success: false, message: 'Bạn chưa nhập vào password' });
        } else {
            UserModel.findOne({ email: req.body.email.toLowerCase() }, function (err, user) {
                if (err) {
                    res.json({ success: false, message: err });
                } else {
                    if (!user) {
                        res.json({ success: false, message: 'Email không tồn tại' });
                    } else {
                        const validPassword = user.comparePassword(req.body.password);
                        if (!validPassword) {
                            res.json({ success: false, message: 'Mật khẩu không đúng' });
                        } else {
                            const token = jwt.sign({ userId: user._id }, config.secret, { expiresIn: 60*60*24 });
                            res.json({ success: true, message: 'Đăng nhập thành công !', token: token, user: { username: user.username } });
                        }
                    }
                }
            });
        }
    }
};

const checkEmail = function (req, res) {
    if (!req.params.email) {
        res.json({ success: false, massage: 'E-mail chưa nhập' });
    } else {
        console.log(req.params.email);
        UserModel.findOne({ email: req.params.email }, function (err, user) {
            if (err) {
                res.json({ success: false, message: err });
            } else {
                if (user) {
                    res.json({ success: false, message: 'E-mail này đã đăng ký' });
                } else {
                    res.json({ success: true, message: 'E-mail này hợp lệ' });
                }
            }
        });
    }
};

const checkEmailForgot = function (req, res) {
    if (!req.params.email) {
        res.json({ success: false, massage: 'E-mail chưa nhập' });
    } else {
        console.log(req.params.email);
        UserModel.findOne({ email: req.params.email }, function (err, user) {
            if (err) {
                res.json({ success: false, message: err });
            } else {
                if (user) {
                    res.json({ success: true, message: 'E-mail này hợp lệ' });
                } else {
                    res.json({ success: false, message: 'E-mail này chưa được đăng ký' });
                }
            }
        });
    }
};

const findUserById = function (req, res) {
    if (!req.params.id) {
        res.json({ success: false, message: 'id user chưa được cung cấp.' });
    } else {
        UserModel.findOne({ _id: req.params.id }, (err, user) => {
            if (err) {
                res.json({ success: false, message: 'id user không hợp lệ' }); // Return error message
            } else {
                if (!user) {
                    res.json({ success: false, message: 'Không tìm thấy user này' });
                } else {
                    res.json({ success: true, user: user });
                }
            }
        });
    }
};
const getUserProfile = function (req, res) {
    UserModel.findOne({ _id: req.decoded.userId }).exec((err, user) => {
        if (err) {
            res.json({ success: false, message: err });
        } else {
            if (!user) {
                res.json({ success: false, message: 'User không tìm thấy' });
            } else {
                res.json({ success: true, user: user });
            }
        }
    });
};

const updatePasswordUser = function (req, res) {
    if (!req.body.email) {
        res.json({ success: false, message: 'Cần phải nhập vào e-mail' });
    } else {
        UserModel.findOne({ email: req.body.email }, (err, user) => {
            if (err) {
                res.json({ success: false, message: 'Email của người dùng không hợp lệ' });
            } else {
                if (!user) {
                    res.json({ success: false, message: 'Không tìm thấy user với email này' });
                } else {
                    var password = Custompassword.generatorPass();
                    user.email = req.body.email,
                    user.password = password

                    user.save((err) => {

                    if (err) {
                        res.json({ success: false, message: 'Error' });
                    } else {
                        // Create e-mail object to send to user
                        var email = {
                            from: 'Admin HKGroup',
                            to: [user.email],
                            subject: 'Forgot Password',
                            text: 'Chào bạn: ' + user.email + ', Mật khẩu của bạn là : ' + password
                            // html: 'Hello<strong> </strong>,<br><br>Thank you for registering at localhost.com. Please click on the link below to complete your activation:<br><br><a href="http://www.herokutestapp3z24.com/activate/">http://www.herokutestapp3z24.com/activate/</a>'
                        };
                        // Function to send e-mail to the user
                        client.sendMail(email, function (err, info) {
                            if (err) {
                                console.log(err); // If error with sending e-mail, log to console/terminal
                                res.json({ success: false, message: 'Kiểm tra lại kết nối mạng ', err });
                            } else {
                                console.log(info); // Log success message to console if sent
                                console.log(user.email); // Display e-mail that it was sent to
                            }
                        });
                        res.json({ success: true, message: 'Forgot Password thành công !, Vui lòng check mail để nhận mật khẩu mới' });
                    }
                });
                }
            }
        });
    }
};

const checkToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        res.json({ success: false, message: 'No token provided' });
    } else {
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                res.json({ success: false, message: 'Token invalid: ' + err });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    }
};

const getAllUsers = function (req, res) {
    UserModel.find({}, function (err, users) {
        if (err) {
            res.json({ success: false, message: 'Lỗi: ' + err });
        } else {
            if (!users) {
                res.json({ success: false, message: 'Rỗng' });
            } else {
                var count = 0;
                count = users.length;
                res.json({ success: true, countusers: count, listUsers: users });
            }
        }
    });
}

const getTop4Users = function (req, res) {
    UserModel.find({}).sort({ uvNumber: 'desc' }).limit(4).exec(function (err, users) {
        if (err) {
            res.json({ success: false, message: err });
        } else {
            if (!users) {
                res.json({ success: false, message: 'Danh sách rỗng' });
            } else {
                res.json({ success: true, listUsers: users });
            }
        }
    });
};

module.exports = {
    register,
    registerWithMail,
    login,
    checkEmail,
    checkEmailForgot,
    getUserProfile,
    updatePasswordUser,
    findUserById,
    checkToken,
    getAllUsers,
    getTop4Users
}