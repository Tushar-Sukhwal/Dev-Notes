
A comprehensive guide on how to clone organization-owned private repositories on AWS EC2 instances using deploy keys. This method is secure and doesn't require storing personal access tokens on the server.

## Prerequisites

- An account with access to the private repository
- SSH connectivity to the EC2 instance established
- Basic knowledge of [[Linux Basic Commands]]

## Step 1: Create Deploy Key on EC2 Instance

### Generate SSH Key Pair

1. SSH into your EC2 instance
2. Generate a new SSH key pair:

```bash
ssh-keygen -t ed25519 -a 100 -C "your-github-email@example.com"
```

> [!note]
> Replace `your-github-email@example.com` with your actual GitHub account email

3. Navigate to the SSH directory (usually `/home/ec2-user/.ssh` or `/home/ubuntu/.ssh`)
4. Display the public key:

```bash
cat ~/.ssh/id_ed25519.pub
```

Copy this public key - you'll need it for the next step.

## Step 2: Add Deploy Key to GitHub Repository

1. Navigate to your private repository on GitHub
2. Click on **Settings** in the top navigation bar
3. Select **Deploy Keys** from the left sidebar
4. Click **Add deploy key** button
5. Enter:
   - **Title**: A descriptive name for this deploy key
   - **Key**: Paste the public key from Step 1
6. Click **Add key** to save

> [!warning]
> Do not modify the public key content when pasting it into GitHub

## Step 3: Test GitHub Connection

Verify that your EC2 instance can authenticate with GitHub:

```bash
ssh -T git@github.com
```

You might see a confirmation prompt:
```
Are you sure you want to continue connecting (yes/no/[fingerprint])?
```

Type `yes` to proceed.

### Expected Success Response
```
Warning: Permanently added 'github.com' (ED25519) to the list of known hosts.
Hi YourORG/YourRepo! You've successfully authenticated, but GitHub does not provide shell access.
```

## Step 4: Install Git (if not already installed)

Update package manager and install Git:

```bash
# For Amazon Linux/CentOS/RHEL
sudo yum update
sudo yum install git

# For Ubuntu/Debian
sudo apt update
sudo apt install git
```

## Step 5: Clone the Private Repository

Now you can clone your private repository using SSH:

```bash
git clone git@github.com:OrgName/your-repo.git
```

Replace `OrgName/your-repo.git` with your actual organization and repository name.

or just 
![[Pasted image 20250607173418.png]]
### Debug SSH Connection

For detailed debugging information:

```bash
ssh -vT git@github.com
```

---

> [!tip]
> This method is preferred over using personal access tokens as it provides repository-specific access and doesn't expose your personal GitHub credentials. 