<h1 align="center">PIOJ Task Management Assessment Project</h1>



## Setup

This Application is a Task Management System implemented with a Laravel Backend and a React.js/Typescript Frondend. 

- Install PHP Server of choice
- install [Nodejs](https://nodejs.org/en/) and [PHP Composer](https://getcomposer.org/download/) from official websites.
- Install [laravel](https://laravel.com/docs/) project on PHP Server.
- Install Reactjs/Typescript via [Vite](https://vitejs.dev/guide/) within laravel project folder.
- Install [laravel Sanctum](https://laravel.com/docs/10.x/starter-kits#laravel-breeze) User Authentication, proprietor(Laravel) recommended for SPA (single page applications). Scaffold using Laravel Breeze.
- Add  **SESSION_DOMAIN=localhost** and **SANCTUM_STATEFUL_DOMAINS=localhost** to .env file 
- Create DATABASE model using a many to many relations between employees and task.

### Notes 

- trigger git local account authentication: 
    - git config user.name your_username
    - git config user.email your_email
    - git config --local credential.helper ""

<br>
<br>
<br>

## Demo Project

- [Click here to demo PIOJ Task Manager](https://pioj.danejanderson.com).