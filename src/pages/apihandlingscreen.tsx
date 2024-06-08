import { Box, Button } from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";
import axios from "axios";
import { useState } from "react";
import BAGrid from "../components/BAGrid";

export default function APIHandlingScreen() {
  const [usersList, setUsersList] = useState<any[]>([]);
  const [dataLoader, setDataLoader] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getApiData = () => {
    setDataLoader(true);
    setError(null);
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        console.log(res, "Success Response");
        setUsersList(res.data);
        setDataLoader(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch data");
        setDataLoader(false);
      });
  };

  const postApiData = () => {
    setError(null);
    axios
      .post("https://jsonplaceholder.typicode.com/todos", {
        userId: 1,
        title: "mubashir khan",
        completed: true,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to post data");
      });
  };

  const putApiData = () => {
    setError(null);
    axios
      .put("https://jsonplaceholder.typicode.com/todos/1", {
        userId: 1,
        id: 1,
        title: "vcsjdfvbdjkcfjkd",
        completed: false,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to update data");
      });
  };

  const deleteApiData = (id: number) => {
    setError(null);
    axios
      .delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then((res) => {
        console.log(res.data);
        setUsersList((prev) => prev.filter((user) => user.id !== id));
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to delete data");
      });
  };

  return (
    <>
      <Box>
        <h1>
          API Handling <PublicIcon />
        </h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Button
          onClick={getApiData}
          sx={{ margin: 1, textTransform: "capitalize" }}
          variant="contained"
          disabled={dataLoader}
        >
          {dataLoader ? "Loading..." : "Get Data"}
        </Button>
        <Button
          onClick={postApiData}
          sx={{ margin: 1, textTransform: "capitalize" }}
          variant="contained"
        >
          Post Data
        </Button>
        <Button
          onClick={putApiData}
          sx={{ margin: 1, textTransform: "capitalize" }}
          variant="contained"
        >
          Put Data
        </Button>
        <Button
          onClick={() => deleteApiData(1)}
          sx={{ margin: 1, textTransform: "capitalize" }}
          variant="contained"
        >
          Delete Data
        </Button>

        <BAGrid
          loading={dataLoader}
          gridCols={[
            {
              key: "name",
              label: "User Name",
            },
            {
              key: "email",
              label: "User Email",
            },
            {
              key: "phone",
              label: "Phone",
            },
            {
              key: "website",
              label: "Web URL",
            },
            {
              key: "",
              label: "Delete",
              displayField: (row: any) => (
                <Button
                  onClick={() => deleteApiData(row.id)}
                  variant="contained"
                >
                  Delete
                </Button>
              ),
            },
          ]}
          datasource={usersList}
        />
      </Box>
    </>
  );
}
