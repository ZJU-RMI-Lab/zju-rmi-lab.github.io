interface CoverClip {
  src: string;
  poster: string;
  title: string;
}

/** One decorative player; rotate clips with a matching poster during each source change. */
export function initializeVideoCover(root: HTMLElement) {
  const video = root.querySelector<HTMLVideoElement>('.cover-video');
  const poster = root.querySelector<HTMLImageElement>('.cover-poster');
  const status = root.querySelector<HTMLElement>('.cover-status');
  const clips: CoverClip[] = JSON.parse(root.dataset.clips ?? '[]');
  if (!video || !poster || !status || !clips.length) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0;
  let wantsPlayback = !reducedMotion.matches;
  let inView = true;
  let failedClips = 0;
  let request = 0;
  video.muted = true;
  root.dataset.activeClip = '0';

  async function playWhenVisible() {
    if (!video || !wantsPlayback || !inView || document.hidden) return;
    const ticket = request;
    try {
      await video.play();
    } catch (error) {
      // A source change or visibility pause may interrupt an older play promise.
      if (ticket !== request || (error instanceof DOMException && error.name === 'AbortError'))
        return;
      wantsPlayback = false;
      video.hidden = true;
    }
  }

  function selectClip(index: number) {
    if (!video || !poster) return;
    current = (index + clips.length) % clips.length;
    request++;
    video.hidden = true;
    video.pause();
    poster.src = clips[current].poster;
    poster.alt = `${clips[current].title} in an SSR humanoid locomotion experiment.`;
    video.poster = clips[current].poster;
    video.src = clips[current].src;
    video.preload = 'auto';
    video.load();
    root.dataset.activeClip = String(current);
    void playWhenVisible();
  }

  video.addEventListener('playing', () => {
    video.hidden = false;
    failedClips = 0;
  });
  video.addEventListener('ended', () => {
    if (wantsPlayback) selectClip(current + 1);
  });
  video.addEventListener('error', () => {
    video.hidden = true;
    failedClips++;
    if (wantsPlayback && failedClips < clips.length) selectClip(current + 1);
    else {
      wantsPlayback = false;
      status.textContent =
        'The cover video is unavailable. An experiment photograph is shown instead.';
    }
  });

  // Respect motion preferences and avoid playing outside the visible page.
  reducedMotion.addEventListener('change', (event) => {
    wantsPlayback = !event.matches;
    if (wantsPlayback) {
      failedClips = 0;
      status.textContent = '';
      selectClip(current);
    } else {
      video.pause();
      video.hidden = true;
    }
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) video.pause();
    else void playWhenVisible();
  });
  const observer = new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    if (inView) void playWhenVisible();
    else video.pause();
  });
  observer.observe(root);
  if (wantsPlayback) selectClip(0);
}
