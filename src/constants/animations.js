
export const FADE_IN = {
  to: async next => {
    setTimeout(async () => {
      await next({ opacity: 1 })  
    }, 300);
  },
  from: { opacity: 0 }
}
