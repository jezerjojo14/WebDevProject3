# Project 2

Web Programming with Python and JavaScript

The app opens with a prompt to choose a display name. The user can either pick one of the existing usernames from a list on the left part of the page or choose a brand new one.
Once a display name is chosen, the left pane shrinks to make way for the main window where the messages are seen. The window has a header that tells you your display name and the channel/person you are sending messages to. The left pane now has a list of channels you can pick or a list of people you message directly. The list of channels ends with an option to create a new channel.
When the browser window is narrower than a certain threshold, the left pane shrinks out of view and can be toggled by clicking on a hamburger icon.

To store channel names or personal chats in the local storage, a local storage item is set to "c-channelname" if the window is closed while messages from a channel were being shown; and the same item is set to "d-username" if the window was closed while messages from a user on direct-chat were being shown.

There are three global variables stored on the server side. There is a list of existing channels, a list of existing users, and a JSON objects called chats. The chats object contains two children objects, channelMessages and pcMessages. channelMessages contain objects that correspond to and are named after existing channels. Each channel contains objects corresponding to individual messages as well as a messageNumber element that tracks how many messages have been sent on the channel. To access direct messages between two users, one would need to go to chats[pcMessages][display-name-1][display-name-2], where display-name-1 would come before display-name-2, were they in a dictionary.