import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Hr,
} from '@react-email/components';

interface SourcingNotificationProps {
  name: string;
  email: string;
  company?: string;
  product: string;
  specifications: string;
  quantity: string;
  targetCountry: string;
}

export function SourcingNotification({
  name,
  email,
  company,
  product,
  specifications,
  quantity,
  targetCountry,
}: SourcingNotificationProps) {
  return (
    <Html>
      <Head />
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          <Heading style={headingStyle}>New Sourcing Request</Heading>
          <Hr style={hrStyle} />
          <Section>
            <Text style={labelStyle}>Name</Text>
            <Text style={valueStyle}>{name}</Text>
            <Text style={labelStyle}>Email</Text>
            <Text style={valueStyle}>{email}</Text>
            {company && (
              <>
                <Text style={labelStyle}>Company</Text>
                <Text style={valueStyle}>{company}</Text>
              </>
            )}
            <Text style={labelStyle}>Product</Text>
            <Text style={valueStyle}>{product}</Text>
            <Text style={labelStyle}>Specifications</Text>
            <Text style={valueStyle}>{specifications}</Text>
            <Text style={labelStyle}>Quantity</Text>
            <Text style={valueStyle}>{quantity}</Text>
            <Text style={labelStyle}>Target Country</Text>
            <Text style={valueStyle}>{targetCountry}</Text>
          </Section>
          <Hr style={hrStyle} />
          <Text style={footerStyle}>
            This email was sent from the Toko Trading website sourcing request form.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const bodyStyle = {
  backgroundColor: '#f9fafb',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const containerStyle = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '32px',
  maxWidth: '580px',
  borderRadius: '8px',
  border: '1px solid #e5e7eb',
};

const headingStyle = {
  color: '#0d7377',
  fontSize: '24px',
  fontWeight: '600' as const,
  margin: '0 0 16px',
};

const hrStyle = {
  borderColor: '#e5e7eb',
  margin: '24px 0',
};

const labelStyle = {
  color: '#6b7280',
  fontSize: '12px',
  fontWeight: '600' as const,
  textTransform: 'uppercase' as const,
  letterSpacing: '0.05em',
  margin: '16px 0 4px',
};

const valueStyle = {
  color: '#1a1a2e',
  fontSize: '16px',
  margin: '0 0 8px',
  lineHeight: '1.5',
};

const footerStyle = {
  color: '#9ca3af',
  fontSize: '12px',
  textAlign: 'center' as const,
};
