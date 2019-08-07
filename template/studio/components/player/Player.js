import React from 'react';
import { clientConfig } from 'part:@sanity/base/client'
import {withDocument} from 'part:@sanity/form-builder'
import css from './Player.css'

/**
 * Audioplayer adapted from https://syntax.fm/
 */
class Player extends React.Component {
  constructor(props) {
    super(props);

    let lastPlayed = 0;

    this.state = {
      progressTime: 50,
      playing: false,
      duration: 0,
      currentTime: lastPlayed,
      playbackRate: 1,
      timeWasLoaded: lastPlayed !== 0
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if(this.audio) {
      this.audio.playbackRate = nextState.playbackRate;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.document._id !== prevProps.document._id && this.audio) {
      const lp = localStorage.getItem(`lastPlayed${this.props.document._id}`);
      if (lp) {
        const data = JSON.parse(lp);
        this.setState({
          currentTime: data.lastPlayed
        });

        this.audio.currentTime = data.lastPlayed;
      }
      this.audio.play();
    } else {
      localStorage.setItem(
        `lastPlayed${this.props.document._id}`,
        JSON.stringify({ lastPlayed: this.state.currentTime })
      );
    }
  }

  timeUpdate = e => {
    // Check if the user already had a curent time
    if (this.state.timeWasLoaded) {
      const lp = localStorage.getItem(`lastPlayed${this.props.document._id}`);
      if (lp) {
        e.currentTarget.currentTime = JSON.parse(lp).lastPlayed;
      }
      this.setState({ timeWasLoaded: false });
    } else {
      const { currentTime = 0, duration = 0 } = e.currentTarget;

      const progressTime = (currentTime / duration) * 100;
      if (Number.isNaN(progressTime)) return;
      this.setState({ progressTime, currentTime, duration });
    }
  };

  togglePlay = () => {
    const method = this.state.playing ? 'pause' : 'play';
    this.audio[method]();
  };

  scrub = e => {
    const scrubTime =
      (e.nativeEvent.offsetX / this.progress.offsetWidth) * this.audio.duration;
    this.audio.currentTime = scrubTime;
  };

  playPause = () => {
    this.setState({ playing: !this.audio.paused });
  };

  volume = e => {
    this.audio.volume = e.currentTarget.value;
  };

  speed = () => {
    let playbackRate = this.state.playbackRate + 0.25;
    if (playbackRate > 2.5) {
      playbackRate = 0.75;
    }
    this.setState({ playbackRate });
  };
  resolveAudioUrl = ({ file = {}, fileUrl }) => {
    const { projectId, dataset } = clientConfig
    if (fileUrl) {
      return fileUrl
    } else if (file.asset) {
      const { asset: { _ref = '' } = {} } = file
      const [type, id, extention] = _ref.split('-')
      const {projectId, dataset} = clientConfig

      const url = `https://cdn.sanity.io/${type}s/${projectId}/${dataset}/${id}.${extention}`
      return url || ''
    }
    return '';
  };

  render() {
    const { document } = this.props
    const { title, file, fileUrl } = document
    const audioUrl = this.resolveAudioUrl({ file, fileUrl })
    if (!audioUrl) {
      return (<div></div>)
    }
    const { playing, progressTime, currentTime, duration } = this.state;

    return (
      <div className={css.player}>
        <div className={`${css.player__section} ${css['player__section--left']}`}>
          <button
            onClick={this.togglePlay}
            aria-label={playing ? 'pause' : 'play'}
          >
            <p className={css.player__icon}>{playing ? '❚❚' : '►'}</p>
            <p>
              {formatTime(currentTime)} / {formatTime(duration)}
            </p>
          </button>
        </div>
        <div className={`${css.player__section} ${css['player__section--middle']}`}>
          <div
            className={css.progress}
            onClick={this.scrub}
            ref={x => (this.progress = x)}
          >
            <div
              className={css.progress__time}
              style={{ width: `${progressTime}%` }}
            />
          </div>
          <h3 className={css.player__title}>
            Playing: {title}
          </h3>
        </div>

        <div className={`${css.player__section} ${css['player__section--right']}`}>
          <button onClick={this.speed} className={css.player__speed}>
            <p>FASTNESS</p>
            <span className={css.player__speeddisplay}>
              {this.state.playbackRate} &times;{' '}
            </span>
          </button>

          <div className={css.player__volume}>
            <p>LOUDNESS</p>
            <div className={css.player__inputs}>
              <input
                onChange={this.volume}
                type="radio"
                name="volume"
                value="0.1"
                id="vol10"
                className={css['sr-only']}
              />
              <label htmlFor="vol10">
                <span className={css['sr-only']}>Volume Level 10/100</span>
              </label>
              <input
                onChange={this.volume}
                type="radio"
                name="volume"
                value="0.2"
                id="vol20"
                className={css['sr-only']}
              />
              <label htmlFor="vol20">
                <span className={css['sr-only']}>Volume Level 20/100</span>
              </label>
              <input
                onChange={this.volume}
                type="radio"
                name="volume"
                value="0.3"
                id="vol30"
                className={css['sr-only']}
              />
              <label htmlFor="vol30">
                <span className={css['sr-only']}>Volume Level 30/100</span>
              </label>
              <input
                onChange={this.volume}
                type="radio"
                name="volume"
                value="0.4"
                id="vol40"
                className={css['sr-only']}
              />
              <label htmlFor="vol40">
                <span className={css['sr-only']}>Volume Level 40/100</span>
              </label>
              <input
                onChange={this.volume}
                type="radio"
                name="volume"
                value="0.5"
                id="vol50"
                className={css['sr-only']}
              />
              <label htmlFor="vol50">
                <span className={css['sr-only']}>Volume Level 50/100</span>
              </label>
              <input
                onChange={this.volume}
                type="radio"
                name="volume"
                value="0.6"
                id="vol60"
                className={css['sr-only']}
              />
              <label htmlFor="vol60">
                <span className={css['sr-only']}>Volume Level 60/100</span>
              </label>
              <input
                onChange={this.volume}
                type="radio"
                name="volume"
                value="0.7"
                id="vol70"
                className={css['sr-only']}
              />
              <label htmlFor="vol70">
                <span className={css['sr-only']}>Volume Level 70/100</span>
              </label>
              <input
                onChange={this.volume}
                type="radio"
                name="volume"
                value="0.8"
                id="vol80"
                className={css['sr-only']}
              />
              <label htmlFor="vol80">
                <span className={css['sr-only']}>Volume Level 80/100</span>
              </label>
              <input
                onChange={this.volume}
                defaultChecked
                type="radio"
                name="volume"
                value="0.9"
                id="vol90"
                className={css['sr-only']}
              />
              <label htmlFor="vol90">
                <span className={css['sr-only']}>Volume Level 90/100</span>
              </label>
              <input
                onChange={this.volume}
                type="radio"
                name="volume"
                value="1"
                id="vol100"
                className={css['sr-only']}
              />
              <label htmlFor="vol100">
                <span className={css['sr-only']}>Volume Level 100/100</span>
              </label>
            </div>
          </div>
        </div>

        <audio
          ref={audio => (this.audio = audio)}
          onPlay={this.playPause}
          onPause={this.playPause}
          onTimeUpdate={this.timeUpdate}
          onLoadedMetadata={this.timeUpdate}
          src={audioUrl}
        />
      </div>
    );
  }
}

export default withDocument(Player)

function formatTime(time) {
  // Hours, minutes and seconds
  var hrs = (~~(time / 3600)).toFixed(0);
  var mins = (~~((time % 3600) / 60)).toFixed(0);
  var secs = (time % 60).toFixed(0);

  // Output like "1:01" or "4:03:59" or "123:03:59"
  var ret = "";

  if (hrs > 0) {
      ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
  }

  ret += "" + mins + ":" + (secs < 10 ? "0" : "");
  ret += "" + secs;
  return ret;
}
