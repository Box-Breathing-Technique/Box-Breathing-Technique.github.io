# Box Breathing Technique

Box Breathing Technique is intended to be a demonstration of React in a web app to create a visualisation of the box breathing technique. The box breathing technique, or square breathing technique, is a controlled breathing technique used to manage anxiety. For more information on the box breathing technique, visit https://www.blackdoginstitute.org.au/wp-content/uploads/2021/05/Square-Breathing-Resource-Guide.pdf.

## Table of Contents

- [1 - Repository Organisation](#1---repository-organisation)
  - [1.1 - Branches](#11---branches)
    - [1.1.1 - main](#111---main)
    - [1.1.2 - dev](#112---dev)
    - [1.1.3 - Feature Branches](#113---feature-branches)
  - [1.2 - Project Management](#12---project-management)
- [2 - Tech Stack](#2---tech-stack)
  - [2.1 - React](#21---react)
  - [2.2 - TypeScript](#22---typescript)
  - [2.3 - npm](#23---npm)
- [3 - CI/CD](#3---cicd)

## 1 - Repository Organisation

### 1.1 - Branches

Rules and standards have been set for specific branches to coordinate the repository.

#### 1.1.1 - main

[main](https://github.com/Box-Breathing-Technique/Box-Breathing-Technique.github.io/tree/main) is a protected branch and is the default branch of this repository. main should contain the latest stable version of the project. This branch can only be added to via pull requests from [dev](#112---dev).

#### 1.1.2 - dev

[dev](https://github.com/Box-Breathing-Technique/Box-Breathing-Technique.github.io/tree/dev) is a protected branch. dev should contain the most recent development version of the project. dev should be updated via pull requests from [feature branches](#113---feature-branches), however pushing directly to dev is permitted to allow for hotfixes and small changes.

#### 1.1.3 - Feature Branches

New features should be implemented in their own branch created from [dev](#112---dev), and merged into dev with a pull request upon completion.

### 1.2 - Project Management

Tasks will be managed using the [Box Breathing Technique GitHub projects board](https://github.com/orgs/Box-Breathing-Technique/projects/1). Tasks will be added and tracked using this board.

## 2 - Tech Stack

### 2.1 - React

React will be used to create the web app.

### 2.2 - TypeScript

TypeScript will be used to assist in development of the web app.

### 2.3 - npm

npm will be use to facilitate managing dependencies, building, and testing of the project.

## 3 - CI/CD

GitHub Actions will be used to set up CI/CD for automatic testing and deployment.
