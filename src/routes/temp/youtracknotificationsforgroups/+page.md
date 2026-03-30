---
title: YouTrack Notifications for Groups
date: 2023-6-15
author: Tyler
---
## Meta comments
- Shape up is opposed to high degrees of design detail in the pitching stage. I watched [this interview with Ryan Singer](https://www.youtube.com/watch?v=h_8M23wVjXk) where he mentions their systems works with a nearly 1:1 designer to developer ratio. That isn't the case here, and because I am applying for a product design role I added more detail well past the **annotated fat markers** recommendation from the book. If the design is so detailed it is stopping conversations from happening I would be HAPPY to switch out my assets for lower fidelity sketches.
- I couldn't find a design system for YouTrack, so I took inspiration and assets from [jetbrains UI kits in figma](https://www.figma.com/@jetbrains) and their [ring UI in storybook](https://jetbrains.github.io/ring-ui/master/index.html)
- I am keeping this together because it seems in the spirit of the work, and the system, but in a Scrum, SAFe, or Kanban system I would probably break down this work into two blocks:
	1. Group notifications
	2. Sending emails to Non-YouTrack users
- I am unclear on exactly how slack alerts work within YouTrack. I see bits of them in the [documentation](https://www.jetbrains.com/help/youtrack/server/working-with-issues-slack.html#youtrack-app-enable-notifications-slack). I think Eclair Inc's wish about waiting 12 hours then alerting via slack message if no one responds is possible with workflows + these updates, but if this work doesn't solve their needs I think the next step is creating another workspace action for slack alerts. 

## Problem Statement

### What are we trying to solve/value proposition:

Users are going through a very manual, error prone, and off platform system to alert teammates of the status of tickets/deploys.  There are also problems with rotating door teams (example: on-call teams for high priority bugs) where some users might need to be alerted one week, but the following week its a different set of users. 

### Why is it important / urgent

We have done interviews with users at Éclair, Cupcake, and PayMeTwice and their current system for managing notifications is a little painful. The Engineering Manager at Eclair is manually letting the on call team know when a high priority ticket comes in. This is a problem because the engineering manager has to always be watching issues, and has to know who is on the on-call team at all times.

At Cupcake and PayMeTwice after deploys, someone is manually emailing people to let them know updates are live. At cupcake the customer success team needs to know about new features or bugfixes so they can tell their customers. At PayMeTwice the design team needs to know so then can do visual regression testing. 


### Success Criteria

- Customers can alert team members with and without YouTrack accounts to the creation, and status change of tickets
- Creators of tickets do not need to know everyone in a group in order to create a new ticket.
- Automated events can alert groups of people instead of just individuals.


### Appetite

2-3 engineers for 5 weeks.

## Solution
_For more context of how to get to these screens you can look at the [raw figma files](https://www.figma.com/file/r9KexOCwvynQ9ntdTeXCsd/YouTrack-Group-Notification?type=design&node-id=5%3A60&t=pCRDMZQXZg5ypr6K-1) or the [flows](https://www.figma.com/proto/r9KexOCwvynQ9ntdTeXCsd/YouTrack-Group-Notification?type=design&node-id=5-60&scaling=contain&page-id=0%3A1&starting-point-node-id=5%3A60&show-proto-sidebar=1) (Scroll up and down to see all the content on each page, navigate from screen to screen using arrows, switch between the four flows by clicking on them in the right rail)_

#### Management of new groups and their messages

A potential improvement is using [YouTrack workflows](https://www.jetbrains.com/help/youtrack/server/Workflow-Guide.html) to target [groups](https://www.jetbrains.com/help/youtrack/server/Manage-User-Groups.html) for notifications.  As well as enhancing the [work flow action for sending an email](https://www.jetbrains.com/help/youtrack/server/action-rules.html) to target an email that isn't associated to a user.

We could add an action to our workflow that allows groups to be selected for notification.
![Notify a group](/temp/YT-notifyAGroup1.png)

Inside of that section we could have a dropdown and message space that allows you to select a group

![Choose which group to send to](/temp/YT-notifyAGroup3.png)

If we go this direction we will also need the ability to adjust notifications settings at this new "group" level. A logical place to put this is within the Access Management interface.

![New tab in group access management](/temp/YT-accessManagement2.png)
From within that tab we will need to give the group all our normal notification controls + slack. We will also need people managing that group to be able to see what workflows that group is a part of.

![Details of notifications within group tab](/temp/YT-accessManagement3.png)

#### How everyday users see the notifications
If you aren't a workspace manager your experience will largely stay the same. The only difference is that in your notification center there will be a "groups" tab, as well as groups messages in your "all notifications" feed.

![New notifications tab](/temp/YT-notifications2.png)

It would be great if we could keep all the [message actions](https://www.jetbrains.com/help/youtrack/server/notification-center.html#message-actions).

![contents of new notifications tab](/temp/YT-notifications3.png)

#### Custom Emails
We could solve the custom email problem by adding it into a workflow. There is already a "send an email message" action, so latching on to that makes the most sense.

![Where we would latch onto](/temp/YT-customEmail3.png)

If we go in that direction here is an idea of how the email input could look

![example of what new email area could look like](/temp/YT-customEmail4.png)


### Non-Goals

-  @ mentions of groups within an issue is a feature that is close to this work, but isn't directly what customers are asking for.
- We aren't allowing users to unsubscribe or mute all messages from a group at this point. It could create a full layer of notification management within our Access Management platform that doesn't seem worth it.
- Team members that don't have the ability to add/remove themselves from groups will need to talk with their workspace managers.

### Rabbit Holes
- Will sending emails to non-YouTrack members run a risk of our emails getting buried in spam? 
- Customers are asking for more complicated slack integrations as part of this work, would it be okay if we launch this work with the basics in place, and add additional later.
	