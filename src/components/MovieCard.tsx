import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";

interface IMovieCardProps {
  Poster: string;
  Title: string;
  Year: string;
}

const MovieCard: React.FC<IMovieCardProps> = ({ Poster, Title, Year }) => {
  return (
    <Box marginTop={3}>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia component="img" height="440" image={Poster} alt="Poster" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {Title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Year: {Year}
          </Typography>
        </CardContent>
        <CardActions>
          <Box display={"flex"} justifyContent={"space-between"} width={"100%"}>
            <Button size="small">Learn More</Button>
            <Button size="small">Add to favorites</Button>
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
};

export default MovieCard;
