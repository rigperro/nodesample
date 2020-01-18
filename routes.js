const express = require('express');
const router = express.Router({mergeParams: true});
const controller = require('./controller');

// ROUTES
// User
router.get('/users', controller.get_users);
router.post('/user', controller.user_create);
router.get('/user/:id', controller.get_user);
router.put('/user/:id', controller.update_user);
router.delete('/user/:id', controller.delete_user);
// Group
router.post('/group', controller.group_create);
router.get('/group/:id', controller.get_group);
router.put('/group/:id', controller.update_group);
router.delete('/group/:id', controller.delete_group);
router.put('/group/:g_id/:u_id', controller.group_add_user);
// Project
router.post('/project', controller.project_create);
router.get('/project/:id', controller.get_project);
router.put('/project/:id', controller.update_project);
router.delete('/project/:id', controller.delete_project);

module.exports = router;
