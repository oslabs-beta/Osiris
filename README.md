<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/oslabs-beta/Osiris/">
    <img src="https://i.ibb.co/pyyR40z/Final-Osiris.jpg" alt="Logo">
  </a>

## Osiris
An Electron based desktop application for generating components and storing them in a UI library.

  __________


<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Usage](#usage)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Contributing](#contributing)
* [Contact](#contact)
* [Authors](#authors)
* [License](#license)



<!-- ABOUT THE PROJECT -->
## About The Project

Osiris is an all-in-one UI Component Library + Generator + Page Builder for developers and designers. Create and store custom, reusable components in React or Vue. Then, dynamically inject the components and manipulate their hierarchy. Finally, download the code for further development.

### Built With
* [Electron](https://getbootstrap.com)
* [React](https://jquery.com)
* [PostgreSQL](https://laravel.com)
* [Express](https://expressjs.com/)
* [Node](https://nodejs.org/en/)
* [AWS](https://aws.amazon.com/)

<!-- USAGE EXAMPLES -->
## Usage

_______


**UI Generator and Library Features**: Create custom components in React or Vue. Store your custom components securely in our UI Library powered by AWS S3

<img src="https://i.ibb.co/6vTMGSC/generator1.gif">

_______


**Build Page: Style and Add to Build**: Easily build a React or Vue page by controlling the hierarchy of your custom components stored in your library. Customize your components by adding CSS and text

<img src="https://i.ibb.co/PzPfFT5/buildpage1.gif">

________


**Build Page: Hierarchy & Download Code to Vue or React**:  Edit the hierarchy with simple arrow buttons. Choose to build your React page with/without State or Hooks. You can also build a Vue page with or without State. Download your page directly.

<img src="https://iili.io/d1XamG.gif" alt="buildpage2">

_______


<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these steps.

### Prerequisite Accounts

* ElephantSQL:
https://www.elephantsql.com/

* AWS S3 Bucket with Amplify: 
https://docs.amplify.aws/lib/storage/getting-started/q/platform/js

### Installation

1. Clone the repo
```sh
git clone https://github.com/oslabs-beta/Osiris.git
```
2. Install NPM packages
```sh
npm install
```
.
### Connect Osiris Electron App to SQL Database with ElephantSQL 

1. SQL Script
```sh
CREATE TABLE individual_ui (id SERIAL PRIMARY KEY, organization_id VARCHAR, image, VARCHAR, tags VARCHAR, react_code VARCHAR, file_name VARCHAR, type VARCHAR, description VARCHAR);
```

2. Add pgkeys.js to /src and include the following:
```sh
export const PG_URI = '<your ElephantSQL uri>'
```
### Initialize AWS-Amplify to your project 

1. Navigate to Osiris Root folder

2. Install Amplify folder following these steps:

https://docs.amplify.aws/start/getting-started/installation/q/integration/react
https://docs.amplify.aws/lib/storage/getting-started/q/platform/android#initialize-amplify-storage

### Run

1. Run the electron app
```sh
npm start
```


<!-- CONTRIBUTING -->
### Contributing

Contributions are what make the open source community such an amazing place to be, learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


<!-- CONTACT -->
## Contact

Website: [https://osirisdev.io](https://osirisdev.io/)

Github Link: [https://github.com/oslabs-beta/Osiris/](https://github.com/oslabs-beta/Osiris/)

Twitter: [@osiris_io](https://twitter.com/osiris_io)
 
<!--- Authors --->
## Authors
```sh
Wayne Wilcox: @LovelaceDink
Eelan Tung: @cupofjoy
Cameron Fitz: @cameronleefitz
Jehovany Cruz: @howaboutjeho
Garrett Lee: @geewailee
```
<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.
