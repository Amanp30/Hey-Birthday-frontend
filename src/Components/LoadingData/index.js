import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function LoadingData({ children, isLoading }) {
  return (
    <>
      {isLoading ? (
        <div className="text-center">
          <Box sx={{ display: "flex" }} className=" justify-center mt-20">
            <CircularProgress />
          </Box>
        </div>
      ) : (
        children
      )}
    </>
  );
}
export default LoadingData;
