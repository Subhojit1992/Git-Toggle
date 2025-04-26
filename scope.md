Git-Toggler is a command-line tool designed to help developers easily switch between different Git user configurations (username and email) without having to manually run Git config commands each time.

Key features:

1. Stores multiple Git configurations (username, email, label) in a YAML file (`git-details.yml`) located in the user's home directory

2. Provides a simple CLI interface with the following commands:
   - Default: Shows the list of saved configurations to choose from
   - `-a, --add`: Add a new Git configuration
   - `-e, --edit`: Edit existing configurations
   - `-d, --delete`: Delete configurations
   - `-c, --current`: View the current Git global configuration
   - `-v, --version`: Show version information

3. When you select a configuration, it automatically runs the Git commands to change your global Git username and email

4. Uses libraries like:
   - inquirer: For interactive CLI prompts
   - chalk: For colored terminal output
   - shelljs: To execute Git commands
   - yaml: To store and read configuration data
   - cli-table3: For displaying data in formatted tables

This tool is particularly useful for developers who work on multiple projects with different Git accounts (personal, work, etc.) and need to switch between them frequently.
