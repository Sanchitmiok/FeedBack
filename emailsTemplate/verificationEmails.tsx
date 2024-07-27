import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
  Button,
} from "@react-email/components";

// TypeScript interface
interface VerificationEmailProps {
  username: string;
  otp: string;
}

export default function VerificationEmail({
  username,
  otp,
}: VerificationEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Verification Code</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>Your verification code is {otp}</Preview>
      <Section style={{ width: '100%', maxWidth: '600px', margin: 'auto', padding: '20px', fontFamily: 'Roboto, Verdana, sans-serif' }}>
        <Row style={{ marginBottom: '20px' }}>
          <Heading as="h2" style={{ fontSize: '24px', margin: '0', color: '#333' }}>
            Hello {username},
          </Heading>
        </Row>
        <Row style={{ marginBottom: '20px' }}>
          <Text style={{ fontSize: '16px', lineHeight: '1.5', color: '#555' }}>
            Thank you for registering with us. Please use the following verification code to complete your registration:
          </Text>
        </Row>
        <Row style={{ marginBottom: '20px' }}>
          <Text style={{ fontSize: '20px', fontWeight: 'bold', color: '#333' }}>
            {otp}
          </Text>
        </Row>
        <Row style={{ marginBottom: '20px' }}>
          <Text style={{ fontSize: '16px', lineHeight: '1.5', color: '#555' }}>
            If you did not request this code, please disregard this email.
          </Text>
        </Row>
        {/* Uncomment and adjust the button styling as needed
        <Row>
          <Button
            href={`http://localhost:3000/verify/${username}`}
            style={{
              display: 'inline-block',
              padding: '10px 20px',
              fontSize: '16px',
              fontWeight: 'bold',
              color: '#fff',
              backgroundColor: '#007bff',
              textDecoration: 'none',
              borderRadius: '5px',
              textAlign: 'center',
            }}
          >
            Verify Here
          </Button>
        </Row>
        */}
      </Section>
    </Html>
  );
}
