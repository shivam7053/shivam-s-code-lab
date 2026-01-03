export const getOptimizedImageUrl = (url?: string) => {
  if (!url) return undefined;
  
  // Handle Google Drive Share Links
  // Matches /file/d/ID/view or just /d/ID
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    return `https://lh3.googleusercontent.com/d/${match[1]}`;
  }
  
  return url;
};