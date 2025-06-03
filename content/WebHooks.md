Also called Reverse API/ Push API

Webhooks are ==a method of real-time communication between applications, where one application sends data to another when a specific event occurs==. They are like reverse APIs, where the receiving application doesn't need to actively poll for data, instead, it receives notifications as they happen.

Example :- If you are using a payment gateway like razorpay or stripe. You will give them a webhook url   like webhook.xyz.com. whenever a payment gets confirm you will get an api call on this url in your backend. This is how your backend will know that the payment went through. 

Earlier methods included [[Long Polling]] and [[Short Polling]] . But they are not resource efficient, so webhook is the best option. 



### More formal definition

Webhooks let you subscribe to events happening in a software system and automatically receive a delivery of data to your server whenever those events occur.

Webhooks are used to receive data as it happens, as opposed to polling an API (calling an API intermittently) to see if data is available. With webhooks, you only need to express interest in an event once, when you create the webhook.

Webhooks are used in a wide range of scenarios, including:

- Triggering CI (continuous integration) pipelines on an external CI server. For example, to trigger CI in Jenkins or CircleCI when code is pushed to a branch.
- Sending notifications about events on GitHub to collaboration platforms. For example, sending a notification to Discord or Slack when there's a review on a pull request.
- Updating an external issue tracker like Jira.
- Deploying to a production server.
- Logging events as they happen on GitHub, for audit purposes.