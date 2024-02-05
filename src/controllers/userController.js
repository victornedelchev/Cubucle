const router = require('express').Router();
const userService = require('../services/userService');

router.get('/register', (req, res) => {
    res.render('user/register');
});

router.post('/register', async (req, res) => {
    const { username, password, repeatPassword } = req.body;
    try {
        await userService.register({ username, password, repeatPassword });
        res.redirect('/users/login');
    } catch (error) {
        console.log(error.errors);
        const { message } = error;
        const errorMessages = message.split(',');
        console.log({ errorMessages });

        res.status(404).render('user/register', { errorMessages });
    }
});

router.get('/login', (req, res) => {
    res.render('user/login');
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const token = await userService.login(username, password);
        res.cookie('auth', token, { httpOnly: true });
    
        res.redirect('/');
    } catch (error) {
        const { message } = error;
        const errorMessages = message.split(',');
        console.log({ errorMessages });

        res.status(404).render('user/login', { errorMessages });
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie('auth');
  
    res.redirect('/');
  });

module.exports = router;