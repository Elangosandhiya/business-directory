import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, MessageSquare, Globe, ExternalLink } from 'lucide-react';
import FeaturedBadge from './FeaturedBadge';
import { FALLBACK_IMAGE } from '../utils/constants';
import { getPhoneLink, getWhatsAppLink, getCleanUrl } from '../utils/formatters';

export default function BusinessCard({ business }) {
  const [imgError, setImgError] = useState(false);

  const {
    id,
    name,
    description,
    category_name,
    location,
    address,
    contact_number,
    whatsapp_number,
    website_url,
    image_url,
    is_featured,
  } = business;

  const displayImage = !imgError && image_url ? image_url : FALLBACK_IMAGE;

  return (
    <div
      className={`group bg-white rounded-2xl border transition-all duration-200 flex flex-col justify-between overflow-hidden shadow-card hover:shadow-card-hover ${
        is_featured
          ? 'border-amber-300/80 ring-1 ring-amber-200'
          : 'border-slate-200 hover:border-slate-300'
      }`}
    >
      <div>
        {/* Card Image Banner */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
          <img
            src={displayImage}
            alt={name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />

          {/* Badges Overlay */}
          <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
            {category_name ? (
              <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-900/80 text-white backdrop-blur-md shadow-sm">
                {category_name}
              </span>
            ) : <span />}

            {is_featured && <FeaturedBadge />}
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5">
          {/* Locality Tag */}
          <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-600 mb-1.5">
            <MapPin className="w-3.5 h-3.5 text-brand-500 shrink-0" />
            <span className="truncate">{location}</span>
          </div>

          {/* Title linking to detail stub */}
          <h3 className="text-lg font-bold text-slate-900 tracking-tight mb-2 group-hover:text-brand-600 transition-colors">
            <Link to={`/business/${id}`} className="hover:underline">
              {name}
            </Link>
          </h3>

          {/* Description */}
          <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed mb-3">
            {description || 'No detailed description available for this Coimbatore listing.'}
          </p>

          {/* Address Line */}
          {address && (
            <p className="text-xs text-slate-400 line-clamp-1 mb-4" title={address}>
              {address}
            </p>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
        {/* Call Button */}
        {contact_number ? (
          <a
            href={getPhoneLink(contact_number)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            title={`Call ${contact_number}`}
          >
            <Phone className="w-3.5 h-3.5 text-slate-500" />
            <span>Call</span>
          </a>
        ) : (
          <span className="text-slate-300">No Phone</span>
        )}

        {/* WhatsApp Button */}
        {whatsapp_number && (
          <a
            href={getWhatsAppLink(whatsapp_number, name)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition-colors"
            title="Chat on WhatsApp"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
            <span>WhatsApp</span>
          </a>
        )}

        {/* Website Link */}
        {website_url ? (
          <a
            href={website_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium text-brand-700 bg-brand-50 border border-brand-200 hover:bg-brand-100 transition-colors"
            title={`Visit ${getCleanUrl(website_url)}`}
          >
            <Globe className="w-3.5 h-3.5 text-brand-600" />
            <span>Site</span>
            <ExternalLink className="w-3 h-3 text-brand-400" />
          </a>
        ) : (
          <Link
            to={`/business/${id}`}
            className="inline-flex items-center gap-1 text-slate-500 hover:text-brand-600 transition-colors font-medium ml-auto"
          >
            <span>Details</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        )}
      </div>
    </div>
  );
}
