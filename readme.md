# Git Toggler

When you need to switch multiple github account you might need to configure your Git username/email like this below

```javascript
git config --global user.name "FIRST_NAME LAST_NAME"
git config --global user.email "MY_NAME@example.com"
```

Navigating this process repeatedly throughout your workdays can be quite cumbersome.

```git-toggler```  transforms feature toggle management by seamlessly integrating with Git and enabling effortless toggling between global configurations for your Git username and email. This tool streamlines the process, offering a centralized control mechanism for swift activation or deactivation of features. Its ability to seamlessly handle global Git configurations enhances efficiency, making it a valuable asset for developers seeking a hassle-free experience in managing feature toggles while maintaining control over their Git identity settings.

### Install

```javascript
npm install -g git-toggler
```

Then you need to create a ```YML``` file in anywhere in your machine. For example ```git-details.yml``` in this file. [(What is YAML?)](https://www.redhat.com/en/topics/automation/what-is-yaml)

```javascript
-
    name: 'Subhojit'
    email: 'my-personal-email@gmail.com'
    label: 'Home GitHub Config'
-
    name: 'Subhojit'
    email: 'my-office-email@myoffice.com'
    label: 'Office GitHub Config'
```

If you add new details. Just add details like below:

```javascript
-
    name: '<user.name>'
    email: '<user.email>'
    label: '<label>'
```

### Usage

Using ```git-toggler``` is very simple. If you installed ```git-toggler``` globally through npm then just run below command in your terminal where your ```YML``` config added.

```javascript
git-toggler ./<PATH>/git-details.yml
// OR
git-toggler ./git-details.yml
```

or you don't need to install anything. ```git-toggler``` is available via ```npx``` 

```javascript
npx git-toggler ./<PATH>/git-details.yml
// OR
npx git-toggler ./git-details.yml
```

### Outro

Dive into the dynamic flow of Git toggles and the exhilarating world of development. Fashioned with love by [Subhojit](https://subhojit.me/), where each line of code is a brushstroke of passion. ❤️