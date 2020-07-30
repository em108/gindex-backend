const express = require("express");
const router = express.Router();
const transport = require('../../plugins/mailtransporter');
const deletePendingUserTemplate = require('../../templates/delete/pending/toAll');

//Model Imports
const User = require("../../models/user");
const PendingUser = require("../../models/pendingUser");

router.post('/user', function(req, res){
	PendingUser.findOne({ email: req.body.email, post: "User" }, function(error, pendingResult){
			if(pendingResult){
				User.findOne({ email: req.body.adminuseremail }, function(error, result){
					if(result){
						if(result.admin){
							PendingUser.deleteOne({ email: req.body.email, post: "User" }, function(error){
								if(error){
									res.status(200).send({
										auth: true,
										removed: false,
										message: "Some Error Processing Your Request. Please Try again Now."
									});
								} else {
									const deleteMessage = {
		                 from: `"${process.env.FRONTENDSITENAME} - Support"<${process.env.EMAILID}>`,
		                 to: pendingResult.email,
		                 replyTo: process.env.REPLYTOMAIL,
		                 subject: 'Regarding Your Request',
		                 html: deletePendingUserTemplate(pendingResult),
		              };
									transport.sendMail(deleteMessage, function(err, info){
		                if(err){
		                  console.log(err);
		                } else {
		                  console.log(info)
		                }
		              })
                  res.status(200).send({
                    auth: true,
                    removed: true,
                    message: "Request has been Deleted"
                  });
								}
							})
						} else {
							res.status(200).send({
								auth: true,
								removed: false,
								message: "You Need to be a Admin."
							});
						}
					} else {
						res.status(200).send({
							auth: true,
							removed: false,
							message: "You are Unauthorized."
						});
					}
				})
			} else {
				res.status(200).send({
					auth: true,
					removed: false,
					message: "BAD REQUEST"
				});
			}
		})
})

router.post('/admin', function(req, res){
	PendingUser.findOne({ email: req.body.email, post: "Admin" }, function(error, pendingResult){
			if(pendingResult){
				User.findOne({ email: req.body.adminemail }, function(error, result){
					if(result){
						if(result.admin){
              if(result.superadmin){
                PendingUser.deleteOne({ email: req.body.email, post: "Admin" }, function(error){
                  if(error){
                    res.status(200).send({
                      auth: true,
                      removed: false,
                      message: "Some Error Processing Your Request. Please Try again Now."
                    });
                  } else {
                    const deleteMessage = {
                       from: `"${process.env.FRONTENDSITENAME} - Support"<${process.env.EMAILID}>`,
                       to: pendingResult.email,
                       replyTo: process.env.REPLYTOMAIL,
                       subject: 'Regarding Your Request',
                       html: deletePendingUserTemplate(pendingResult),
                    };
                    transport.sendMail(deleteMessage, function(err, info){
                      if(err){
                        console.log(err);
                      } else {
                        console.log(info)
                      }
                    })
                    res.status(200).send({
                      auth: true,
                      removed: true,
                      message: "Request has been Deleted"
                    });
                  }
                })
              } else {
                res.status(200).send({
  								auth: true,
  								removed: false,
  								message: "You Need to be a SuperAdmin."
  							});
              }
						} else {
							res.status(200).send({
								auth: true,
								removed: false,
								message: "You Need to be a Admin."
							});
						}
					} else {
						res.status(200).send({
							auth: true,
							removed: false,
							message: "You are Unauthorized."
						});
					}
				})
			} else {
				res.status(200).send({
					auth: true,
					removed: false,
					message: "BAD REQUEST"
				});
			}
		})
})

router.post('/superadmin', function(req, res){
	PendingUser.findOne({ email: req.body.email, post: "SuperAdmin" }, function(error, pendingResult){
			if(pendingResult){
				User.findOne({ email: req.body.adminemail }, function(error, result){
					if(result){
						if(result.admin){
              if(result.superadmin){
                PendingUser.deleteOne({ email: req.body.email, post: "SuperAdmin" }, function(error){
                  if(error){
                    res.status(200).send({
                      auth: true,
                      removed: false,
                      message: "Some Error Processing Your Request. Please Try again Now."
                    });
                  } else {
                    const deleteMessage = {
                       from: `"${process.env.FRONTENDSITENAME} - Support"<${process.env.EMAILID}>`,
                       to: pendingResult.email,
                       replyTo: process.env.REPLYTOMAIL,
                       subject: 'Regarding Your Request',
                       html: deletePendingUserTemplate(pendingResult),
                    };
                    transport.sendMail(deleteMessage, function(err, info){
                      if(err){
                        console.log(err);
                      } else {
                        console.log(info)
                      }
                    })
                    res.status(200).send({
                      auth: true,
                      removed: true,
                      message: "Request has been Deleted"
                    });
                  }
                })
              } else {
                res.status(200).send({
  								auth: true,
  								removed: false,
  								message: "You Need to be a SuperAdmin."
  							});
              }
						} else {
							res.status(200).send({
								auth: true,
								removed: false,
								message: "You Need to be a Admin."
							});
						}
					} else {
						res.status(200).send({
							auth: true,
							removed: false,
							message: "You are Unauthorized."
						});
					}
				})
			} else {
				res.status(200).send({
					auth: true,
					removed: false,
					message: "BAD REQUEST"
				});
			}
		})
})

module.exports = router;
