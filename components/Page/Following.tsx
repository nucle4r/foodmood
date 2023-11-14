import { Box, Heading, VStack, Image, Text, Link, ScrollView, HStack, Icon, LinkText, Avatar, AvatarFallbackText } from "@gluestack-ui/themed";
import { ArrowUpRightFromCircle, ArrowUpRightSquare, Heart, HomeIcon, MessageCircle } from "lucide-react-native";
import React, { Component } from "react";
import { View, StyleSheet } from "react-native";


export default class FollowingFeed extends Component {
  state = {
    count: 0,
  };

  render() {
    return (
      <ScrollView style={{backgroundColor:"#fff"}}>
        <Box
          maxWidth="100%"
          borderColor="$borderLight200"
          borderRadius="$lg"
          borderWidth="$1"
          my="$4"
          overflow="hidden"
          sx={{
            "@base": {
              mx: "$5",
            },
            _dark: {
              bg: "$backgroundDark900",
              borderColor: "$borderDark800",
            },
          }}
        >
          <HStack alignItems="center" space="md" margin={10}>
            <Avatar bgColor="#FA7070" size="sm" borderRadius="$full">
              <AvatarFallbackText>Priyanshu Singh</AvatarFallbackText>
            </Avatar>
            <Text size="sm" fontWeight="bold">
              priyanshu20_
            </Text>
          </HStack>
          <Box>
            <Image
              h={200}
              w="100%"
              source={{
                uri: "https://images.unsplash.com/photo-1549888834-3ec93abae044?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
              }}
              alt="Orange"
            />
          </Box>
          <HStack>
            <Icon as={Heart} size="xl" style={{ margin: 10 }} />
            <Icon as={MessageCircle} size="xl" style={{ margin: 10 }} />
            <Icon as={ArrowUpRightFromCircle} size="xl" style={{ margin: 10 }} />
          </HStack>
          <VStack marginHorizontal={10}>
            <Text size="sm">
              0 Likes
            </Text>
            <Link>
              <LinkText size="sm" color="gray">
                View all 0 comments
              </LinkText>
            </Link>

          </VStack>
          <VStack margin={10}>
            <Heading size="md">
              Fresh Orange
            </Heading>
            <Text
              my="$1.5"
              fontSize="$xs"
              isTruncated={true}
            >
              Vitamin C also helps with the absorption of iron and the production of
              collagen, which supports healthy skin, teeth, and bones.
            </Text>
            <Link href="https://gluestack.io/" isExternal style={{ alignSelf: "flex-end" }}>
              <Text fontSize="$sm" color="#FA7070">
                Find out more...
              </Text>
            </Link>
            <Text size="xs">
              August 16, 2023
            </Text>
          </VStack>
        </Box>
        <Box
          maxWidth="100%"
          borderColor="$borderLight200"
          borderRadius="$lg"
          borderWidth="$1"
          my="$4"
          overflow="hidden"
          sx={{
            "@base": {
              mx: "$5",
            },
            _dark: {
              bg: "$backgroundDark900",
              borderColor: "$borderDark800",
            },
          }}
        >
          <HStack alignItems="center" space="md" margin={10}>
            <Avatar bgColor="#FA7070" size="sm" borderRadius="$full">
              <AvatarFallbackText>Priyanshu Singh</AvatarFallbackText>
            </Avatar>
            <Text size="sm" fontWeight="bold">
              priyanshu20_
            </Text>
          </HStack>
          <Box>
            <Image
              h={200}
              w="100%"
              source={{
                uri: "https://images.unsplash.com/photo-1549888834-3ec93abae044?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
              }}
              alt="Orange"
            />
          </Box>
          <HStack>
            <Icon as={Heart} size="xl" style={{ margin: 10 }} />
            <Icon as={MessageCircle} size="xl" style={{ margin: 10 }} />
            <Icon as={ArrowUpRightFromCircle} size="xl" style={{ margin: 10 }} />
          </HStack>
          <VStack marginHorizontal={10}>
            <Text size="sm">
              0 Likes
            </Text>
            <Link>
              <LinkText size="sm" color="gray">
                View all 0 comments
              </LinkText>
            </Link>

          </VStack>
          <VStack margin={10}>
            <Heading size="md">
              Fresh Orange
            </Heading>
            <Text
              my="$1.5"
              fontSize="$xs"
              isTruncated={true}
            >
              Vitamin C also helps with the absorption of iron and the production of
              collagen, which supports healthy skin, teeth, and bones.
            </Text>
            <Link href="https://gluestack.io/" isExternal style={{ alignSelf: "flex-end" }}>
              <Text fontSize="$sm" color="#FA7070">
                Find out more...
              </Text>
            </Link>
            <Text size="xs">
              August 16, 2023
            </Text>
          </VStack>
        </Box>
        <Box
          maxWidth="100%"
          borderColor="$borderLight200"
          borderRadius="$lg"
          borderWidth="$1"
          my="$4"
          overflow="hidden"
          sx={{
            "@base": {
              mx: "$5",
            },
            _dark: {
              bg: "$backgroundDark900",
              borderColor: "$borderDark800",
            },
          }}
        >
          <HStack alignItems="center" space="md" margin={10}>
            <Avatar bgColor="#FA7070" size="sm" borderRadius="$full">
              <AvatarFallbackText>Priyanshu Singh</AvatarFallbackText>
            </Avatar>
            <Text size="sm" fontWeight="bold">
              priyanshu20_
            </Text>
          </HStack>
          <Box>
            <Image
              h={200}
              w="100%"
              source={{
                uri: "https://images.unsplash.com/photo-1549888834-3ec93abae044?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
              }}
              alt="Orange"
            />
          </Box>
          <HStack>
            <Icon as={Heart} size="xl" style={{ margin: 10 }} />
            <Icon as={MessageCircle} size="xl" style={{ margin: 10 }} />
            <Icon as={ArrowUpRightFromCircle} size="xl" style={{ margin: 10 }} />
          </HStack>
          <VStack marginHorizontal={10}>
            <Text size="sm">
              0 Likes
            </Text>
            <Link>
              <LinkText size="sm" color="gray">
                View all 0 comments
              </LinkText>
            </Link>

          </VStack>
          <VStack margin={10}>
            <Heading size="md">
              Fresh Orange
            </Heading>
            <Text
              my="$1.5"
              fontSize="$xs"
              isTruncated={true}
            >
              Vitamin C also helps with the absorption of iron and the production of
              collagen, which supports healthy skin, teeth, and bones.
            </Text>
            <Link href="https://gluestack.io/" isExternal style={{ alignSelf: "flex-end" }}>
              <Text fontSize="$sm" color="#FA7070">
                Find out more...
              </Text>
            </Link>
            <Text size="xs">
              August 16, 2023
            </Text>
          </VStack>
        </Box>
        <Box
          maxWidth="100%"
          borderColor="$borderLight200"
          borderRadius="$lg"
          borderWidth="$1"
          my="$4"
          overflow="hidden"
          sx={{
            "@base": {
              mx: "$5",
            },
            _dark: {
              bg: "$backgroundDark900",
              borderColor: "$borderDark800",
            },
          }}
        >
          <HStack alignItems="center" space="md" margin={10}>
            <Avatar bgColor="#FA7070" size="sm" borderRadius="$full">
              <AvatarFallbackText>Priyanshu Singh</AvatarFallbackText>
            </Avatar>
            <Text size="sm" fontWeight="bold">
              priyanshu20_
            </Text>
          </HStack>
          <Box>
            <Image
              h={200}
              w="100%"
              source={{
                uri: "https://images.unsplash.com/photo-1549888834-3ec93abae044?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
              }}
              alt="Orange"
            />
          </Box>
          <HStack>
            <Icon as={Heart} size="xl" style={{ margin: 10 }} />
            <Icon as={MessageCircle} size="xl" style={{ margin: 10 }} />
            <Icon as={ArrowUpRightFromCircle} size="xl" style={{ margin: 10 }} />
          </HStack>
          <VStack marginHorizontal={10}>
            <Text size="sm">
              0 Likes
            </Text>
            <Link>
              <LinkText size="sm" color="gray">
                View all 0 comments
              </LinkText>
            </Link>

          </VStack>
          <VStack margin={10}>
            <Heading size="md">
              Fresh Orange
            </Heading>
            <Text
              my="$1.5"
              fontSize="$xs"
              isTruncated={true}
            >
              Vitamin C also helps with the absorption of iron and the production of
              collagen, which supports healthy skin, teeth, and bones.
            </Text>
            <Link href="https://gluestack.io/" isExternal style={{ alignSelf: "flex-end" }}>
              <Text fontSize="$sm" color="#FA7070">
                Find out more...
              </Text>
            </Link>
            <Text size="xs">
              August 16, 2023
            </Text>
          </VStack>
        </Box>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});