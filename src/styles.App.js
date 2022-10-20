import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 50px 0px;
  input {
    cursor: pointer;
  }
  .upload {
    margin-bottom: 100px;
  }
  .item_wrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
    @media (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 30px;
    }
    @media (max-width: 576px) {
      grid-template-columns: repeat(1, 1fr);
      gap: 10px;
    }
  }
  .single_item {
    padding: 10px;
    border-radius: 10px;
  }
  button {
    cursor: pointer;
  }
  .month {
    cursor: pointer;
  }
  .year {
    cursor: pointer;
  }
`;
