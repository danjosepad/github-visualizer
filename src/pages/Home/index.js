import React, { useState } from 'react';
import { AiOutlineGithub, AiOutlinePlus } from 'react-icons/ai'

// Project imports

import {
  Container,
  Content,
  LogoContent,
  Form,
  Input,
  Button
 } from './styles';
import { H1 as Title } from '../../styles/fonts';
import { colors } from '../../styles/theme';

function Home() {
  const [repositories, setRepositories] = useState([]);

  const onAdd = () => {

  }

  return (
    <Container>
      <Content>
        <LogoContent>
          <AiOutlineGithub size="160px"/>
          <Title>Github Visualizer</Title>

          <Form>
          <Input placeholder="Adicionar repositórios"/>
          <Button>
            <AiOutlinePlus size="25px" color={colors.white} />
          </Button>
          </Form>
        </LogoContent>
      </Content>
    </Container>
  )
}

export default Home