<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">

  <h3 align="center">Official Documentation for ChainFundit Api</h3>

  <p align="center">
    Visit the website
    <br />
    <a href="https://chainfundit.com"><strong> »</strong></a>
  
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

Welcome to the API documentation for ChainFundit. As a developer for our platform, it is important to have a thorough understanding of how our API works before making any contributions.

This documentation is organized into sections that cover different aspects of the API, including authentication, campaign management, and donation processing. Each section includes detailed information about the available endpoints, including the required parameters and expected responses. The documentation also includes examples of how to use the API in different programming languages.

Please read the documentation carefully and let us know if you have any questions or need assistance. Kindly reach out to the Team's Lead for any questions and clarifications

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

- ![NodeJS][node.js]
- ![ExpressS][express.js]
- ![MongoDB ][mongo]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file both in the category and template directory respectively

look at the example in `.env.example`

create your own `.env` file with the following variables.

- `STRIPE_SECRET_KEY`
- `PAYSTACK_SECRET_KEY`
- `CHAINFOUNDATION_PAYPAL_SECRET_KEY`
- `CHAINFOUNDATION_PAYPAL_CLIENT_ID`
- `CHAINFOUNDATION_PAYPAL_ACCESS_TOKEN`

### Prerequisites

Node should be installed on your machine.

please refer to the [Node JS Download webpage](https://nodejs.org/en/download/)

### Run Locally

1. Clone the repo
   ```sh
   git clone https://github.com/ChainFundIt/Chainfundit-api.git
   ```
2. Install NPM dependecies
   ```sh
   npm install
   ```
3. Start developement server

```sh
 npm run dev
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

As a developer, contributing to the ChainFundit project is highly encouraged. Not only will you be helping to improve the platform, but you will also have the opportunity to learn and grow as a developer. However, in order to ensure that the project runs smoothly and to avoid any issues with server breaks or merge conflicts, it is important to follow certain guidelines when making contributions.

Here are a few steps to keep in mind when contributing to the ChainFundit project:

- Familiarize yourself with the project's codebase and architecture before making any changes. This will help you to understand how the different components of the platform interact with each other and will allow you to make more informed decisions about your contributions.

- Test your changes thoroughly before submitting a pull request. This will help to ensure that your contributions do not introduce any bugs or issues into the platform.

- Follow the project's coding style and conventions. Consistency in code style makes it easier for other developers to understand and review your contributions.

- Clearly document any changes you make to the codebase. This will help other developers to understand the purpose and functionality of your contributions.

- Create a new branch for your contributions. This will help to keep the development process organized and will allow multiple contributions to be worked on simultaneously without causing conflicts.

- Finally, always communicate and coordinate with the project maintainers, to ensure your contributions align with the project's objectives and roadmap.

By following these steps, you can help to ensure that your contributions to the ChainFundit project are smooth, well-organized, and valuable to the platform.

<!-- Making changes -->

## Making Changes

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
6. Open an issue to your Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Ladetunji Osibanjo - Ladetunji@chainfundit.com

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
[node.js]: https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white
[express.js]: https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB
[mongo]: https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white
[next-url]: https://nextjs.org/
[react.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/
