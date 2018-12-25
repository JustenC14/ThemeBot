# ThemeBot

ThemeBot is a Discord bot that allows users to generate playlists
automatically based on tags, and then play those generated playlists
in a discord voice channel.

## Usage & Config

ThemeBot is still under early development. Information on installation and
other resources will be provided when we are closer to actual release.

## Commands

### `!generate <tags>`:

The `!generate` command will make ThemeBot generate a Youtube playlist
based off of the `<tags>` you provide it. When using the `!generate` command,
you must provide ThemeBot at least one `<tag>`.

After generating the playlist ThemeBot will display it in the chat that the `!generate`
command was called.

### `!play`:

The `!play` command will make ThemeBot join the voice channel of the user that entered
the command. ThemeBot will then begin playing the generated playlist. The user can also specify
a song from the playlist to start at by executing the command `!play <id>`, where `<id>` is an
integer in the range 0 to 25. If the user does not supply an `<id>`, then ThemeBot will automatically
start from the first song on the playlist.

### `!next`:

The `!next` command will make ThemeBot stop playing its current song, and move on to the next one
in the generated playlist.

### `!stop`:

The `!stop` command will make ThemeBot stop playing music all together, and leave the voice channel
that it is in.

### `!history`:

The `!history` command will make ThemeBot provide a list of all songs that ThemeBot has played in
its current session. A session starts when ThemeBot joins a voice channel, and ends when it leaves.

### `!replay`:

The `!replay` command works similarly to `!play` by taking an `<id>` also. However, when the user
executes the `!replay <id>` command, the `<id>` corresponds to the `<id>` the song is provided when
using the `!history` command.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
