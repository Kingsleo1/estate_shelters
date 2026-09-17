/**
 * Astra DB Connection Layer for Estate Shelters
 * Supports DataStax Astra DB Document/Data API and CQL integrations
 */

export interface AstraConfig {
  token?: string;
  endpoint?: string;
  namespace?: string;
  keyspace?: string;
  isConfigured: boolean;
}

export function getAstraConfig(): AstraConfig {
  const token = process.env.ASTRA_DB_APPLICATION_TOKEN;
  const endpoint = process.env.ASTRA_DB_API_ENDPOINT;
  const namespace = process.env.ASTRA_DB_NAMESPACE || process.env.ASTRA_DB_KEYSPACE || 'default_keyspace';

  const isConfigured = Boolean(token && endpoint && token.startsWith('AstraCS:') && endpoint.includes('astra.datastax.com'));

  return {
    token,
    endpoint,
    namespace,
    keyspace: namespace,
    isConfigured
  };
}

/**
 * Execute Astra DB Data API HTTP REST Call
 */
export async function executeAstraDataApi(
  collectionName: string,
  command: string,
  payload: any
): Promise<{ success: boolean; data?: any; error?: string }> {
  const config = getAstraConfig();

  if (!config.isConfigured || !config.token || !config.endpoint) {
    return {
      success: false,
      error: 'Astra DB credentials not detected in environment. Add ASTRA_DB_APPLICATION_TOKEN and ASTRA_DB_API_ENDPOINT in settings.'
    };
  }

  try {
    const cleanEndpoint = config.endpoint.replace(/\/$/, '');
    const url = `${cleanEndpoint}/api/json/v1/${config.namespace}/${collectionName}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Token': config.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        [command]: payload
      })
    });

    if (!res.ok) {
      const errText = await res.text();
      return { success: false, error: `Astra DB HTTP ${res.status}: ${errText}` };
    }

    const json = await res.json();
    return { success: true, data: json };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Astra DB connection failed' };
  }
}

/**
 * Test Astra DB Connection Live
 */
export async function testAstraConnection(): Promise<{
  connected: boolean;
  statusMessage: string;
  keyspace?: string;
  details?: any;
}> {
  const config = getAstraConfig();

  if (!config.isConfigured || !config.token || !config.endpoint) {
    return {
      connected: false,
      statusMessage: 'Astra DB credentials not fully configured in environment yet.',
      keyspace: config.namespace
    };
  }

  try {
    const cleanEndpoint = config.endpoint.replace(/\/$/, '');
    // Test endpoint with findCollections or getKeyspace command
    const url = `${cleanEndpoint}/api/json/v1/${config.namespace}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Token': config.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        findCollections: {}
      })
    });

    if (res.ok) {
      const json = await res.json();
      return {
        connected: true,
        statusMessage: 'Successfully connected to DataStax Astra DB cluster!',
        keyspace: config.namespace,
        details: json
      };
    }

    const errText = await res.text();
    return {
      connected: false,
      statusMessage: `Astra DB returned status ${res.status}: ${errText.slice(0, 200)}`,
      keyspace: config.namespace
    };
  } catch (err: any) {
    return {
      connected: false,
      statusMessage: `Failed to ping Astra DB endpoint: ${err?.message || err}`,
      keyspace: config.namespace
    };
  }
}

/**
 * Astra DB Schema Definition Document for Estate Shelters
 */
export const ASTRA_DB_SCHEMA_DOCUMENTATION = {
  collections: [
    {
      name: 'properties',
      description: 'Stores all Abuja residential, commercial and land listings with vector embeddings support',
      indices: ['property_id', 'slug', 'property_type', 'district', 'price', 'status', 'featured']
    },
    {
      name: 'locations',
      description: 'Hierarchical Nigerian & Abuja location entities (AMAC, Bwari, Gwagwalada, Kuje, districts, estates)'
    },
    {
      name: 'enquiries',
      description: 'Client property lead submissions and WhatsApp conversion logs'
    },
    {
      name: 'property_requests',
      description: 'Find My Property custom search submissions'
    },
    {
      name: 'inspections',
      description: 'Booked physical and virtual property inspection schedules'
    },
    {
      name: 'partners',
      description: 'Developer and engineering partners (Urban Shelters, Ditto Group, Tayan, Ipent, CAAM)'
    },
    {
      name: 'blog_posts',
      description: 'Market insights, title guidance, and investment articles'
    },
    {
      name: 'newsletter_subscribers',
      description: 'Email subscribers for property market newsletters'
    },
    {
      name: 'site_settings',
      description: 'Corporate settings, CAC number, primary WhatsApp number, and address'
    }
  ]
};
