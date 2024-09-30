import { useState, useEffect } from 'react';

export type IBoard = {};

export const useBoards = () => {
  const [boards, setBoards] = useState<IBoard[]>([]);

  useEffect(() => {
    const graphqlEndpoint = "https://ztycn97642.stage.lithium.com/t5/s/api/2.1/graphql";

    const query = `
      query BoardsQuery {
        boards {
          edges {
            node {
              id
              title
              views
              messagesCount
              conversationStyle
            }
          }
        }
      }
    `;

    fetch(graphqlEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    })
      .then(response => response.json())
      .then(data => {
        const boardsData = data;
        setBoards(boardsData);
      })
      .catch(error => {
        console.error('Error fetching boards:', error);
      });
  }, []); 

  console.log('Boards Data:', boards);

  return {
    boards,
  };
};