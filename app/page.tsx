'use client';

import { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  TextField,
  Box,
  Avatar,
  Divider,
  CardActions
} from '@mui/material';

function PostCard({ title, content }: { title: string; content: string }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<string[]>([]);
  const [commentInput, setCommentInput] = useState('');

  const toggleLike = () => {
    setLiked(!liked);
    setLikes(prev => (liked ? prev - 1 : prev + 1));
  };

  const addComment = () => {
    if (!commentInput.trim()) return;
    setComments([...comments, commentInput]);
    setCommentInput('');
  };

  const sharePost = () => alert('Post Shared!');

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>{content}</Typography>

        <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
          <Button size="small" onClick={toggleLike}>
            {liked ? 'Liked' : 'Like'} ({likes})
          </Button>
          <Button size="small" onClick={() => setShowComments(!showComments)}>
            Comment
          </Button>
          <Button size="small" onClick={sharePost}>
            Share
          </Button>
        </Stack>

        {showComments && (
          <>
            <TextField
              size="small"
              placeholder="Write a comment..."
              fullWidth
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              sx={{ mb: 1 }}
            />
            <Button size="small" onClick={addComment}>Post Comment</Button>

            <Stack spacing={1} sx={{ mt: 1 }}>
              {comments.map((c, i) => (
                <Typography key={i} variant="body2">• {c}</Typography>
              ))}
            </Stack>
          </>
        )}
      </CardContent>
    </Card>
  );
}

// Suggestion component
function SuggestionCard({ name, onRemove }: { name: string; onRemove: () => void }) {
  const [status, setStatus] = useState<'connect' | 'pending' | 'connected'>('connect');

  const handleClick = () => {
    if (status === 'connect') setStatus('pending');
    else if (status === 'pending') setStatus('connected');
    else {
      setStatus('connect');
      onRemove();
    }
  };

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 1 }}>
      <Typography variant="body2">{name}</Typography>
      <Button
        size="small"
        variant={status === 'connect' ? 'outlined' : 'contained'}
        color={status === 'connect' ? 'primary' : status === 'pending' ? 'warning' : 'success'}
        onClick={handleClick}
      >
        {status === 'connect'
          ? 'Connect'
          : status === 'pending'
            ? 'Pending'
            : 'Connected'}
      </Button>
    </Stack>
  );
}

function SuggestionsColumn() {
  const [suggestions, setSuggestions] = useState(['Alice', 'Bob', 'Charlie']);

  const removeSuggestion = (name: string) => {
    setSuggestions((prev) => prev.filter((s) => s !== name));
  };

  return (
    <Card sx={{ mb: 2, p: 1 }}>
      <CardContent>
        <Typography variant="h6">Suggestions</Typography>
        {suggestions.map((name) => (
          <SuggestionCard
            key={name}
            name={name}
            onRemove={() => removeSuggestion(name)}
          />
        ))}
      </CardContent>
    </Card>
  );
}

// Profile component
function ProfileCard() {
  const [name, setName] = useState('Jigisha Ponda');
  const [editing, setEditing] = useState(false);
  const [tempName, setTempName] = useState(name);
  const [headline, setHeadline] = useState('Frontend Developer');
  const [tempHeadline, setTempHeadline] = useState(headline);

  const saveProfile = () => {
    setName(tempName);
    setHeadline(tempHeadline);
    setEditing(false);
  };

  return (
    <Card sx={{ mb: 2, borderRadius: 2, overflow: 'hidden' }}>
      {/* Profile Header */}
      <Box sx={{ bgcolor: '#1976d2', height: 80 }} /> {/* Blue header background */}

      {/* Avatar */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: -4 }}>
        <Avatar sx={{ width: 80, height: 80 }} src="" />
      </Box>

      <CardContent sx={{ textAlign: 'center', pt: 1 }}>
        {editing ? (
          <>
            <TextField
              size="small"
              fullWidth
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              sx={{ mb: 1 }}
            />
            <TextField
              size="small"
              fullWidth
              value={tempHeadline}
              onChange={(e) => setTempHeadline(e.target.value)}
              sx={{ mb: 1 }}
              placeholder="Headline"
            />
            <Button variant="contained" size="small" onClick={saveProfile} fullWidth>
              Save
            </Button>
          </>
        ) : (
          <>
            <Typography variant="h6">{name}</Typography>
            <Typography variant="body2" color="text.secondary">{headline}</Typography>
            <Button size="small" sx={{ mt: 1 }} onClick={() => setEditing(true)}>Edit Profile</Button>
          </>
        )}
      </CardContent>

      <Divider />

      {/* Connections */}
      <CardContent sx={{ textAlign: 'center', pt: 1, pb: 1 }}>
        <Typography variant="body2" color="text.secondary">
          150 Connections
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Grow your network
        </Typography>
      </CardContent>

      <Divider />

      {/* Quick Links */}
      <CardActions sx={{ display: 'flex', flexDirection: 'column', textAlign: 'left', px: 2 }}>
        <Button size="small" fullWidth>My Profile</Button>
        <Button size="small" fullWidth>My Network</Button>
        <Button size="small" fullWidth>Posts & Activity</Button>
      </CardActions>
    </Card>
  );
}


// Main HomePage
export default function HomePage() {
  const [posts, setPosts] = useState([
    { title: 'Exciting Project!', content: 'Just completed a new project using Next.js and MUI.' },
    { title: 'Career Update', content: 'Looking forward to collaborating on amazing projects.' }
  ]);
  const [newPostContent, setNewPostContent] = useState('');

  const addNewPost = () => {
    const newPost = { title: 'New Post', content: newPostContent };
    setPosts([newPost, ...posts]);
    setNewPostContent('');
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        {/* Profile */}
        <Grid item xs={12} md={3} display={{ xs: 'none', sm: 'block' }}>
          <ProfileCard />
        </Grid>

        {/* Feed */}
        <Grid item xs={12} md={6}>
          {/* New Post Input */}
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <TextField
                label="Start a post"
                placeholder="What's on your mind?"
                multiline
                fullWidth
                minRows={2}
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                sx={{ mb: 1 }}
              />
              <Button
                variant="contained"
                fullWidth
                onClick={addNewPost}
                disabled={!newPostContent.trim()}
              >
                Post
              </Button>
            </CardContent>
          </Card>

          {/* Dynamic Posts */}
          {posts.map((post, idx) => (
            <PostCard key={idx} title={post.title} content={post.content} />
          ))}
        </Grid>

        {/* Suggestions */}
        <Grid item xs={12} md={3} display={{ xs: 'none', sm: 'block' }}>
          <SuggestionsColumn />
        </Grid>
      </Grid>
    </Container>
  );
}

