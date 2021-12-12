import { FC } from "react";
import { Center, Button, Tabs, TabList, Tab, TabPanels, TabPanel, Container } from "@chakra-ui/react";



interface IProps extends Viewer {

}

export const SettingView: FC<IProps> = (props) => {

  const {
    next
  } = props;


  return (
    <Container maxW="container.xl" bgColor="whiteAlpha.50">
      <Tabs >
        <TabList>
          <Tab>One</Tab>
          <Tab>Two</Tab>
          <Tab>Three</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <p>one!</p>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>

    </Container>
  );
};


export default SettingView;


export const Set2 = (props: IProps) => {
  return (
    <section>
      <Center>
        <h1>Set2</h1>
      </Center>
      <Center bg="tomato" h="100px" >
        <Button colorScheme="blue" onClick={props.next}>
          Next
        </Button>
      </Center>
    </section>
  );
};

export const Set3 = (props: IProps) => {
  return (
    <section>
      <Center>
        <h1>Set3</h1>
      </Center>
      <Center bg="tomato" h="100px" >
        <Button colorScheme="blue" onClick={props.next}>
          Next
        </Button>
      </Center>
    </section>
  );
};