const mongoose = require('mongoose');
const User = require('../app/models/user');
const Group = require('../app/models/group');
const Project = require('../app/models/project')

// ~ User paths  ~

// GET /users
exports.get_users = (req, res) => {
  q = req.query
  if ('projectID' in q) {
    Project.findOne(mongoose.Types.ObjectId(q.projectID)).then(function (p) {
      User.find({},{id:1}).where('_id').in(p.members).then(function (m) {
        res.json(m.map(({_id: hex}) => ({id: hex})));
      });
    });
  } else if ('groupID' in q) {
    User.find({'groups':mongoose.Types.ObjectId(q.groupID)},{id:1}).then(function (g) {
      res.json(g.map(({_id: hex}) => ({id: hex})));
    });
  } else {
    User.find({}, {"id":1}).then(function (users) {
      res.send(users);
    });
  };
};

// POST /user
exports.user_create = async (req, res, next) => {
  let user = new User(
    {
      name: req.body.name,
      email: req.body.email,
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
      groups: req.body.groups
    }
  );
  await user.save(function (err, new_user) {
    if (err) {
      return next(err);
    }
    console.log("Created user!");
    res.status(201).send({message: "User successfully created", id: new_user.id});
  });
};

// GET /user/{id}
exports.get_user = async (req, res) => {
  await User.findOne(mongoose.Types.ObjectId(req.params.id)).then(function (found_user) {
    res.send({id: found_user.id, name: found_user.name, email: found_user.email});
  });
};

// PUT /user/{id}
exports.update_user = async (req, res) => {
  let id = req.params.id;
  let update = {
    name: req.body.name,
    email: req.body.email,
    address: req.body.address,
    phoneNumber: req.body.phoneNumber,
    groups: req.body.groups
  };
  await User.findOneAndUpdate({_id:id}, update, {new: true}, function(err, updated) {
    if (err) {
      return next(err);
    } else {
      res.send({message:"User succesfully updated", id: updated.id, name: updated.name, email: updated.email});
    }
  });
};

// DELETE /user/{id}
exports.delete_user = async (req, res, next) => {
  await User.deleteOne({_id: req.params.id}, function(err, user) {
    if (err) {
      return next(err);
    } else {
      res.send({message:"User succesfully deleted", id: req.params.id});
    }
  })
};

// ~ Group paths ~

// POST /group
exports.group_create = async (req, res, next) => {
  let group = new Group(
    {
      name: req.body.name,
      owner: req.body.owner
    }
  );
  await group.save(function(err, new_group) {
    if (err) {
      return next(err);
    }
    console.log("Created group!");
    res.status(201).send({message: "Group successfully created", id: new_group.id});
  });
};

// GET /group/{id}
exports.get_group = async (req, res) => {
  await Group.findOne(mongoose.Types.ObjectId(req.params.id)).then(function (found_group) {
    res.send({id: found_group.id, name: found_group.name, owner: found_group.owner});
  });
};

// PUT /group/{id}
exports.update_group = async (req, res, next) => {
  let id = req.params.id;
  let update = {
    name: req.body.name,
    owner: req.body.owner
  };
  await Group.findOneAndUpdate({_id: id}, update, {new: true}, function(err, updated) {
    if (err) {
      return next(err);
    } else {
      res.send({message: "Group succesfully updated", id: updated.id, name: updated.name, owner: updated.owner});
    };
  });
};

// DELETE /group/{id}
exports.delete_group = async (req, res, next) => {
  await Group.deleteOne({_id: req.params.id}, function (err, group) {
    if (err) {
      return next(err);
    } else {
      res.send({message: "Group succesfully deleted", id: req.params.id});
    };
  });
};

// PUT /group/{group_id}/{user_id}
exports.group_add_user = async (req, res, next) => {
  await User.findById(req.params.u_id).then(function (user) {
    Group.findById(req.params.g_id).then(function (group) {
      user.groups.push(group);
      user.save(function(err, result) {
        if (err) {
          return next(err);
        } else {
          res.send({message: "User succesfully added into a group", id: user.id});
        };
      });
    });
  });
};

// ~ Project paths ~

// POST /project
exports.project_create = async (req, res, next) => {
  let project = new Project(
    {
      name: req.body.name,
      description: req.body.description,
      type: req.body.type,
      members: req.body.members
    }
  );
  await project.save(function(err, new_project) {
    if (err) {
      return next(err);
    }
    console.log("Created project!");
    res.status(201).send({message: "Project successfully created", id: new_project.id});
  });
};

// GET /project/{id}
exports.get_project = async (req, res, next) => {
  await Project.findOne(mongoose.Types.ObjectId(req.params.id)).then(function (found_project, err) {
    if (err) {
      return next(err);
    } else {
      res.send({id: found_project.id, name: found_project.name, description: found_project.description, type: found_project.type, members: found_project.members});
    };
  });
};

// PUT /project/{id}
exports.update_project = async (req, res, next) => {
  let id = req.params.id;
  let update = {
    name: req.body.name,
    description: req.body.description,
    type: req.body.type,
    members: req.body.members
  };
  await Project.findOneAndUpdate({_id: id}, update, {new: true}, function(err, updated) {
    if (err) {
      return next(err);
    } else {
      res.send({message: "Project succesfully updated", id: updated.id, name: updated.name, description: updated.description, type: updated.type, members: updated.members});
    };
  });
};

// DELETE /project/{id}
exports.delete_project = async (req, res, next) => {
  await Project.deleteOne({_id: req.params.id}, function (err, project) {
    if (err) {
      return next(err);
    } else {
      res.send({message: "Project succesfully deleted", id: req.params.id});
    };
  });
};
