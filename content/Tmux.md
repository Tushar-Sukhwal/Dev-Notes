TMux stands for **terminal multiplexer**1. It allows you to switch easily between several programs in one terminal, detach them (they keep running in the background) and reattach them to a different terminal1.

It lets you create multiple:

1. **Sessions**
2. **Windows**
3. **Panes**

## Basic Commands

| Command                    | Description                     |
| -------------------------- | ------------------------------- |
| `tmux`                     | Start a new tmux session        |
| `Ctrl + b + d`             | Detach from the current session |
| `tmux ls`                  | List all sessions               |
| `tmux a -t 0`              | Attach to session 0             |
| `tmux new -s aws`          | Create new session named "aws"  |
| `tmux kill-session -t aws` | Kill session named "aws"        |

## Pane Management

|Shortcut|Action|
|---|---|
|`Ctrl + b + %`|Split vertically|
|`Ctrl + b + "`|Split horizontally|
|`Ctrl + b + arrow key`|Move around panes|
|`Ctrl + b + q`|Show pane index numbers|
|`Ctrl + b + x`|Kill current pane|

## Window Management

|Shortcut|Action|
|---|---|
|`Ctrl + b + c`|Create new window in the same session|
|`Ctrl + b + w`|List all sessions and windows|
|`Ctrl + b + ,`|Rename the current window|
|`Ctrl + b + n`|Move to next window sequentially|
|`Ctrl + b + [number]`|Move to window number `[number]`|
|`Ctrl + b + &`|Kill current window|
|`Ctrl + b + w` followed by `Ctrl + b + x`|Kill selected window|

> **Note**: The prefix key `Ctrl + b` is the default command prefix in tmux. All tmux commands start with this key combination.