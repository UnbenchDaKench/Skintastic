import React, { useState } from "react";
import "./NavDropdown.scss";
import { motion, AnimatePresence } from "framer-motion";
import {
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  Box,
  ListItemButton,
} from "@mui/material";

const sections = [
  {
    title: "Skincare",
    links: ["Face", "Body", "Lip", "Eye"],
  },
];

function NavDropdown({ openNavDropdown, linkName, handleLinkLeave }) {
  const [isHovered, setIsHovered] = useState(openNavDropdown);
  return (
    <div className="NavDropdown" onMouseLeave={handleLinkLeave}>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "absolute",
              width: "100vw",
              height: "400px",
              top: "100%",
              left: 0,
            }}
          >
            <Paper
              elevation={4}
              sx={{
                width: "100%",
                height: "100%",
              }}
            >
              {sections.map((section, index) => (
                //{section.title === linkName ?}
                <React.Fragment key={index}>
                  {section.title === linkName ? (
                    <List
                      dense
                      sx={{
                        width: "25%",
                        height: "100%",
                      }}
                    >
                      {section.links.map((sublink, index) => (
                        <ListItemButton key={index}>
                          <ListItemText
                            disableTypography
                            primary={sublink}
                            sx={{ fontFamily: "Raleway" }}
                          />
                        </ListItemButton>
                      ))}
                    </List>
                  ) : (
                    <></>
                  )}
                </React.Fragment>
              ))}

              <Box
                sx={{
                  width: "75%",
                  height: "100%",
                }}
              ></Box>
            </Paper>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default NavDropdown;
