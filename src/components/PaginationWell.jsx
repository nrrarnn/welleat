import { Pagination, Grid, Card, Text } from "@nextui-org/react";
import { PropTypes } from "prop-types";
import { useState } from "react";

const PaginationWell = ({ items, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the total number of pages
  const totalPages = Math.ceil(items.length / itemsPerPage);

  // Get the items for the current page
  const currentItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Grid.Container gap={2} justify="center">
        {currentItems.map((item, index) => (
          <Grid xs={12} sm={6} key={index}>
            <Card>
              <Card.Body>
                <Text>{item}</Text>
              </Card.Body>
            </Card>
          </Grid>
        ))}
      </Grid.Container>

      <Pagination
        total={totalPages}
        initialPage={1}
        onChange={handlePageChange}
        page={currentPage}
        size="lg"
        css={{ marginTop: "20px", justifyContent: "center" }}
      />
    </div>
  );
};

export default PaginationWell;

PaginationWell.propTypes = {
  items: PropTypes.array.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
};
